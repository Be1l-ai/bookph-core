import type { z } from "zod";

import { getSerializableForm } from "@bookph/core/app-store/routing-forms/lib/getSerializableForm";
import type { zodFields, zodRoutes } from "@bookph/core/app-store/routing-forms/zod";
import { hasFilter } from "@bookph/core/features/filters/lib/hasFilter";
import {
  entityPrismaWhereClause,
  canEditEntity,
} from "@bookph/core/features/pbac/lib/entityPermissionUtils.server";
import logger from "@bookph/core/lib/logger";
import { safeStringify } from "@bookph/core/lib/safeStringify";
import type { PrismaClient } from "@bookph/core/prisma";
import type { Prisma } from "@bookph/core/prisma/client";
import { entries } from "@bookph/core/prisma/zod-utils";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import type { TFormSchema } from "./forms.schema";

interface FormsHandlerOptions {
  ctx: {
    prisma: PrismaClient;
    user: NonNullable<TrpcSessionUser>;
  };
  input: TFormSchema;
}
const log = logger.getSubLogger({ prefix: ["[formsHandler]"] });

export const formsHandler = async ({ ctx, input }: FormsHandlerOptions) => {
  const { prisma, user } = ctx;

  const where = getPrismaWhereFromFilters(user, input?.filters);
  log.debug("Getting forms where", JSON.stringify(where));

  const forms = await prisma.app_RoutingForms_Form.findMany({
    where,
    orderBy: [
      {
        position: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    include: {
      team: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          responses: true,
        },
      },
    },
  });

  const totalForms = await prisma.app_RoutingForms_Form.count({
    where: entityPrismaWhereClause({
      userId: user.id,
    }),
  });

  return {
    filtered: await buildFormsWithReadOnlyStatus(),
    totalCount: totalForms,
  };

  async function buildFormsWithReadOnlyStatus() {
    // Avoid crash of one form to crash entire listing
    const settledFormsWithReadonlyStatus = await Promise.allSettled(
      forms.map(async (form) => {
        const [hasWriteAccess, serializedForm] = await Promise.all([
          canEditEntity(form, user.id),
          getSerializableForm({ form }),
        ]);

        return {
          form: serializedForm,
          readOnly: !hasWriteAccess,
        };
      })
    );

    const formsWithReadonlyStatus = settledFormsWithReadonlyStatus.map((result, index) => {
      if (result.status === "fulfilled") {
        // Normal case
        return {
          ...result.value,
          hasError: false,
        };
      }

      // Error case
      const form = forms[index];
      log.error(`Error getting form ${form.id}: ${safeStringify(result.reason)}`);

      return {
        form: {
          ...form,
          // Usually the error is in parsing routes/fields as they are JSON. So, we just set them empty, so that form can be still listed.
          routes: [] as z.infer<typeof zodRoutes>,
          fields: [] as z.infer<typeof zodFields>,
        },
        // Consider it readonly as we don't know the status due to error
        readOnly: true,
        hasError: true,
      };
    });
    return formsWithReadonlyStatus;
  }
};

export default formsHandler;
type SupportedFilters = Omit<NonNullable<NonNullable<TFormSchema>["filters"]>, "upIds"> | undefined;

export function getPrismaWhereFromFilters(
  user: {
    id: number;
  },
  filters: SupportedFilters
) {
  const where = {
    OR: [] as Prisma.App_RoutingForms_FormWhereInput[],
  };

  const prismaQueries: Record<
    keyof NonNullable<typeof filters>,
    (...args: [number[]]) => Prisma.App_RoutingForms_FormWhereInput
  > & {
    all: () => Prisma.App_RoutingForms_FormWhereInput;
  } = {
    userIds: (userIds: number[]) => ({
      userId: {
        in: userIds,
      },
      teamId: null,
    }),
    teamIds: (teamIds: number[]) => ({
      team: {
        id: {
          in: teamIds ?? [],
        },
        members: {
          some: {
            userId: user.id,
            accepted: true,
          },
        },
      },
    }),
    all: () => ({
      OR: [
        {
          userId: user.id,
        },
        {
          team: {
            members: {
              some: {
                userId: user.id,
                accepted: true,
              },
            },
          },
        },
      ],
    }),
  };

  if (!filters || !hasFilter(filters)) {
    where.OR.push(prismaQueries.all());
  } else {
    for (const entry of entries(filters)) {
      if (!entry) {
        continue;
      }
      const [filterName, filter] = entry;
      const getPrismaQuery = prismaQueries[filterName];
      // filter might be accidentally set undefined as well
      if (!getPrismaQuery || !filter) {
        continue;
      }
      where.OR.push(getPrismaQuery(filter));
    }
  }

  return where;
}

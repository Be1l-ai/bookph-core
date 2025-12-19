import { WorkflowRepository } from "@bookph/core/features/ee/workflows/repositories/WorkflowRepository";
import { addPermissionsToWorkflows } from "@bookph/core/features/workflows/repositories/WorkflowPermissionsRepository";
import type { PrismaClient } from "@bookph/core/prisma";
import type { Prisma } from "@bookph/core/prisma/client";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import type { TFilteredListInputSchema } from "./filteredList.schema";

type FilteredListOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    prisma: PrismaClient;
  };
  input: TFilteredListInputSchema;
};

const { include: includedFields } = {
  include: {
    activeOn: {
      select: {
        eventType: {
          select: {
            id: true,
            title: true,
            parentId: true,
            _count: {
              select: {
                children: true,
              },
            },
          },
        },
      },
    },
    activeOnTeams: {
      select: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
    steps: true,
    team: {
      select: {
        id: true,
        slug: true,
        name: true,
        members: true,
        logoUrl: true,
        isOrganization: true,
      },
    },
  },
} satisfies Prisma.WorkflowDefaultArgs;

export const filteredListHandler = async ({ ctx, input }: FilteredListOptions) => {
  const result = await WorkflowRepository.getFilteredList({ userId: ctx.user.id, input });

  if (!result) {
    return result;
  }

  // Add permissions to each workflow
  const workflowsWithPermissions = await addPermissionsToWorkflows(result.filtered, ctx.user.id);

  const filteredWorkflows = workflowsWithPermissions.filter((workflow) => workflow.permissions.canView);

  return {
    ...result,
    filtered: filteredWorkflows,
  };
};

import { v4 } from "uuid";

import { PermissionCheckService } from "@bookph/core/features/pbac/services/permission-check.service";
import { updateTriggerForExistingBookings } from "@bookph/core/features/webhooks/lib/scheduleTrigger";
import { prisma } from "@bookph/core/prisma";
import type { Webhook } from "@bookph/core/prisma/client";
import type { Prisma } from "@bookph/core/prisma/client";
import { MembershipRole } from "@bookph/core/prisma/enums";
import { EventTypeMetaDataSchema } from "@bookph/core/prisma/zod-utils";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import { TRPCError } from "@trpc/server";

import type { TCreateInputSchema } from "./create.schema";

type CreateOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TCreateInputSchema;
};

export const createHandler = async ({ ctx, input }: CreateOptions) => {
  const { user } = ctx;

  const webhookData: Prisma.WebhookCreateInput = {
    id: v4(),
    ...input,
  };
  if (input.platform && user.role !== "ADMIN") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (input.teamId) {
    const permissionService = new PermissionCheckService();

    const hasPermission = await permissionService.checkPermission({
      userId: user.id,
      teamId: input.teamId,
      permission: "webhook.create",
      fallbackRoles: [MembershipRole.ADMIN, MembershipRole.OWNER],
    });

    if (!hasPermission) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
  }

  // Add userId if platform, eventTypeId, and teamId are not provided
  if (!input.platform && !input.eventTypeId && !input.teamId) {
    webhookData.user = { connect: { id: user.id } };
  }

  if (input.eventTypeId) {
    const parentManagedEvt = await prisma.eventType.findFirst({
      where: {
        id: input.eventTypeId,
        parentId: {
          not: null,
        },
      },
      select: {
        parentId: true,
        metadata: true,
      },
    });

    if (parentManagedEvt?.parentId) {
      const isLocked = !EventTypeMetaDataSchema.parse(parentManagedEvt.metadata)?.managedEventConfig
        ?.unlockedFields?.webhooks;
      if (isLocked) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }
  }

  let newWebhook: Webhook;
  try {
    newWebhook = await prisma.webhook.create({
      data: webhookData,
    });
  } catch (error) {
    // Avoid printing raw prisma error on frontend
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create webhook" });
  }

  await updateTriggerForExistingBookings(newWebhook, [], newWebhook.eventTriggers);

  return newWebhook;
};

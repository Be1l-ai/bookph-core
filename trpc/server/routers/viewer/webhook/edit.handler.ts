import { PermissionCheckService } from "@bookph/core/features/pbac/services/permission-check.service";
import {
  updateTriggerForExistingBookings,
  deleteWebhookScheduledTriggers,
  cancelNoShowTasksForBooking,
} from "@bookph/core/features/webhooks/lib/scheduleTrigger";
import { prisma } from "@bookph/core/prisma";
import { MembershipRole } from "@bookph/core/prisma/enums";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import { TRPCError } from "@trpc/server";

import type { TEditInputSchema } from "./edit.schema";

type EditOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TEditInputSchema;
};

export const editHandler = async ({ input, ctx }: EditOptions) => {
  const { id, ...data } = input;

  const webhook = await prisma.webhook.findUnique({
    where: {
      id,
    },
  });

  if (!webhook) {
    return null;
  }

  if (webhook.platform) {
    const { user } = ctx;
    if (user?.role !== "ADMIN") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  }

  if (webhook.teamId) {
    const permissionService = new PermissionCheckService();

    const hasPermission = await permissionService.checkPermission({
      userId: ctx.user.id,
      teamId: webhook.teamId,
      permission: "webhook.update",
      fallbackRoles: [MembershipRole.ADMIN, MembershipRole.OWNER],
    });

    if (!hasPermission) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
  }

  const updatedWebhook = await prisma.webhook.update({
    where: {
      id,
    },
    data: {
      ...data,
      time: data.time ?? null,
      timeUnit: data.timeUnit ?? null,
    },
  });

  if (data.active) {
    const activeTriggersBefore = webhook.active ? webhook.eventTriggers : [];
    await updateTriggerForExistingBookings(webhook, activeTriggersBefore, updatedWebhook.eventTriggers);
  } else if (!data.active && webhook.active) {
    await cancelNoShowTasksForBooking({
      webhook: {
        id: webhook.id,
        userId: webhook.userId,
        teamId: webhook.teamId,
        eventTypeId: webhook.eventTypeId,
      },
    });
    await deleteWebhookScheduledTriggers({ webhookId: webhook.id });
  }

  return updatedWebhook;
};

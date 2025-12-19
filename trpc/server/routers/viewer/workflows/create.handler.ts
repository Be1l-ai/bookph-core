import emailReminderTemplate from "@bookph/core/ee/workflows/lib/reminders/templates/emailReminderTemplate";
import { PermissionCheckService } from "@bookph/core/features/pbac/services/permission-check.service";
import { SENDER_NAME } from "@bookph/core/lib/constants";
import { getTranslation } from "@bookph/core/lib/server/i18n";
import { getTimeFormatStringFromUserTimeFormat } from "@bookph/core/lib/timeFormat";
import type { PrismaClient } from "@bookph/core/prisma";
import { prisma } from "@bookph/core/prisma";
import type { Workflow } from "@bookph/core/prisma/client";
import {
  MembershipRole,
  TimeUnit,
  WorkflowActions,
  WorkflowTemplates,
  WorkflowTriggerEvents,
} from "@bookph/core/prisma/enums";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import { TRPCError } from "@trpc/server";

import type { TCreateInputSchema } from "./create.schema";

type CreateOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    prisma: PrismaClient;
  };
  input: TCreateInputSchema;
};

export const createHandler = async ({ ctx, input }: CreateOptions) => {
  const { teamId } = input;

  const userId = ctx.user.id;

  if (teamId) {
    const permissionService = new PermissionCheckService();

    const hasPermission = await permissionService.checkPermission({
      userId,
      teamId,
      permission: "workflow.create",
      fallbackRoles: [MembershipRole.ADMIN, MembershipRole.OWNER],
    });

    if (!hasPermission) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
  }

  try {
    const workflow: Workflow = await prisma.workflow.create({
      data: {
        name: "",
        trigger: WorkflowTriggerEvents.BEFORE_EVENT,
        time: 24,
        timeUnit: TimeUnit.HOUR,
        userId,
        teamId,
      },
    });

    const renderedEmailTemplate = emailReminderTemplate({
      isEditingMode: true,
      locale: ctx.user.locale,
      t: await getTranslation(ctx.user.locale, "common"),
      action: WorkflowActions.EMAIL_ATTENDEE,
      timeFormat: getTimeFormatStringFromUserTimeFormat(ctx.user.timeFormat),
    });

    await ctx.prisma.workflowStep.create({
      data: {
        stepNumber: 1,
        action: WorkflowActions.EMAIL_ATTENDEE,
        template: WorkflowTemplates.REMINDER,
        reminderBody: renderedEmailTemplate.emailBody,
        emailSubject: renderedEmailTemplate.emailSubject,
        workflowId: workflow.id,
        sender: SENDER_NAME,
        numberVerificationPending: false,
        verifiedAt: new Date(),
      },
    });
    return { workflow };
  } catch (e) {
    throw e;
  }
};

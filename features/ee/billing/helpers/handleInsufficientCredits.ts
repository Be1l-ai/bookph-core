import { sendCreditBalanceLimitReachedEmails } from "@bookph/core/emails/billing-email-service";
import logger from "@bookph/core/lib/logger";
import type { PrismaClient } from "@bookph/core/prisma";
import type { CreditUsageType } from "@bookph/core/prisma/enums";

import { getUserAndTeamWithBillingPermission } from "./getUserAndTeamWithBillingPermission";

const log = logger.getSubLogger({ prefix: ["handleInsufficientCredits"] });

export async function handleInsufficientCredits({
  userId,
  teamId,
  creditFor,
  prismaClient,
  context,
}: {
  userId?: number | null;
  teamId?: number | null;
  creditFor: CreditUsageType;
  prismaClient: PrismaClient;
  context?: Record<string, unknown>;
}): Promise<void> {
  try {
    const { user, team } = await getUserAndTeamWithBillingPermission({
      userId,
      teamId,
      prismaClient,
    });

    if (team || user) {
      await sendCreditBalanceLimitReachedEmails({
        team,
        user,
        creditFor,
      });

      log.info("Credit limit reached email sent", {
        userId,
        teamId,
        creditFor,
        ...context,
      });
    } else {
      log.warn("No user or team found to send credit limit email", {
        userId,
        teamId,
        creditFor,
        ...context,
      });
    }
  } catch (error) {
    log.error("Failed to send credit limit email", {
      error,
      userId,
      teamId,
      creditFor,
      ...context,
    });
  }
}

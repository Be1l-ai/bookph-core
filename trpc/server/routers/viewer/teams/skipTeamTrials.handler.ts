import { getTeamBillingServiceFactory } from "@bookph/core/ee/billing/di/containers/Billing";
import { SubscriptionStatus } from "@bookph/core/ee/billing/repository/billing/IBillingRepository";
import { MembershipRepository } from "@bookph/core/features/membership/repositories/MembershipRepository";
import { IS_SELF_HOSTED } from "@bookph/core/lib/constants";
import logger from "@bookph/core/lib/logger";
import { prisma } from "@bookph/core/prisma";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import type { TSkipTeamTrialsInputSchema } from "./skipTeamTrials.schema";

const log = logger.getSubLogger({ prefix: ["skipTeamTrials"] });

type SkipTeamTrialsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TSkipTeamTrialsInputSchema;
};

export const skipTeamTrialsHandler = async ({ ctx }: SkipTeamTrialsOptions) => {
  // If self-hosted, no need to skip trials as they're already handled differently
  if (IS_SELF_HOSTED) return { success: true };

  try {
    await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        trialEndsAt: null,
      },
    });

    const ownedTeams = await MembershipRepository.findAllAcceptedTeamMemberships(ctx.user.id, {
      role: "OWNER",
    });

    for (const team of ownedTeams) {
      const teamBillingServiceFactory = getTeamBillingServiceFactory();
      const teamBillingService = teamBillingServiceFactory.init(team);

      const subscriptionStatus = await teamBillingService.getSubscriptionStatus();

      if (subscriptionStatus === SubscriptionStatus.TRIALING) {
        await teamBillingService.endTrial();
        log.info(`Ended trial for team ${team.id}`);
      }
    }

    return { success: true };
  } catch (error) {
    log.error("Error skipping team trials", error);
    return { success: false, error: "Failed to skip team trials" };
  }
};

export default skipTeamTrialsHandler;

import { sendVerificationCode } from "@bookph/core/features/ee/workflows/lib/reminders/verifyPhoneNumber";
import hasKeyInMetadata from "@bookph/core/lib/hasKeyInMetadata";
import { CreditsRepository } from "@bookph/core/lib/server/repository/credits";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import { TRPCError } from "@trpc/server";

import { hasTeamPlanHandler } from "../teams/hasTeamPlan.handler";
import type { TSendVerificationCodeInputSchema } from "./sendVerificationCode.schema";

type SendVerificationCodeOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TSendVerificationCodeInputSchema;
};

export const sendVerificationCodeHandler = async ({ ctx, input }: SendVerificationCodeOptions) => {
  const { user } = ctx;

  const isCurrentUsernamePremium =
    user && hasKeyInMetadata(user, "isPremium") ? !!user.metadata.isPremium : false;

  const creditBalance = await CreditsRepository.findCreditBalance({ userId: user.id });
  const hasNoAdditionalCredits = !!creditBalance && creditBalance.additionalCredits <= 0;

  let isTeamsPlan = false;
  if (!isCurrentUsernamePremium) {
    const { hasTeamPlan } = await hasTeamPlanHandler({ ctx });
    isTeamsPlan = !!hasTeamPlan;
  }

  if (!isCurrentUsernamePremium && !isTeamsPlan && hasNoAdditionalCredits) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const { phoneNumber } = input;
  return sendVerificationCode(phoneNumber);
};

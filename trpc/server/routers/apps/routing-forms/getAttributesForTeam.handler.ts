import { MembershipRepository } from "@bookph/core/features/membership/repositories/MembershipRepository";
import { getAttributesForTeam } from "@bookph/core/lib/service/attribute/server/getAttributes";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import { TRPCError } from "@trpc/server";

import type { TGetAttributesForTeamInputSchema } from "./getAttributesForTeam.schema";

type GetAttributesForTeamHandlerOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TGetAttributesForTeamInputSchema;
};

export default async function getAttributesForTeamHandler({
  ctx,
  input,
}: GetAttributesForTeamHandlerOptions) {
  const { teamId } = input;
  const { user } = ctx;
  const isMemberOfTeam = await MembershipRepository.findUniqueByUserIdAndTeamId({ userId: user.id, teamId });

  if (!isMemberOfTeam) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "You are not a member of this team",
    });
  }

  return getAttributesForTeam({ teamId });
}

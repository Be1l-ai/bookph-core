import { TeamService } from "@bookph/core/features/ee/teams/services/teamService";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import type { TInviteMemberByTokenSchemaInputSchema } from "./inviteMemberByToken.schema";

type InviteMemberByTokenOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TInviteMemberByTokenSchemaInputSchema;
};

export const inviteMemberByTokenHandler = async ({ ctx, input }: InviteMemberByTokenOptions) => {
  const { token } = input;

  return TeamService.inviteMemberByToken(token, ctx.user.id);
};

export default inviteMemberByTokenHandler;

import { TeamService } from "@bookph/core/features/ee/teams/services/teamService";
import { PermissionCheckService } from "@bookph/core/features/pbac/services/permission-check.service";
import { WEBAPP_URL } from "@bookph/core/lib/constants";
import { Redirect } from "@bookph/core/lib/redirect";
import { MembershipRole } from "@bookph/core/prisma/enums";

import { TRPCError } from "@trpc/server";

import type { TrpcSessionUser } from "../../../types";
import type { TPublishInputSchema } from "./publish.schema";

type PublishOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TPublishInputSchema;
};

async function checkPermissions({ ctx, input }: PublishOptions) {
  const { profile } = ctx.user;
  const permissionCheckService = new PermissionCheckService();

  const isOrg = !!profile?.organizationId;
  const permission = isOrg ? "organization.update" : "team.update";
  const teamId = isOrg ? profile.organizationId : input.teamId;

  const hasUpdatePermission = await permissionCheckService.checkPermission({
    userId: ctx.user.id,
    teamId,
    permission,
    fallbackRoles: [MembershipRole.OWNER, MembershipRole.ADMIN],
  });

  if (!hasUpdatePermission) throw new TRPCError({ code: "UNAUTHORIZED" });
}

export const publishHandler = async ({ ctx, input }: PublishOptions) => {
  const { teamId } = input;
  await checkPermissions({ ctx, input });

  try {
    const { redirectUrl, status } = await TeamService.publish(teamId);
    if (redirectUrl) return { url: redirectUrl, status };
  } catch (error) {
    /** We return the url for client redirect if needed */
    if (error instanceof Redirect) return { url: error.url };
    let message = "Unknown Error on publishHandler";
    if (error instanceof Error) message = error.message;
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
  }

  return {
    url: `${WEBAPP_URL}/settings/teams/${teamId}/profile`,
    message: "Team published successfully",
  };
};

export default publishHandler;

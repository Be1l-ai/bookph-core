import { getAppFromSlug } from "@bookph/core/app-store/utils";
import { type InvalidAppCredentialBannerProps } from "@bookph/core/features/users/components/InvalidAppCredentialsBanner";
import { prisma } from "@bookph/core/prisma";
import { MembershipRole } from "@bookph/core/prisma/enums";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

type checkInvalidAppCredentialsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const checkInvalidAppCredentials = async ({ ctx }: checkInvalidAppCredentialsOptions) => {
  const userId = ctx.user.id;

  // First get the teams where user is admin/owner
  const userTeamIds = await prisma.membership.findMany({
    where: {
      userId: userId,
      accepted: true,
      role: { in: [MembershipRole.ADMIN, MembershipRole.OWNER] },
    },
    select: {
      teamId: true,
    },
  });

  const apps = await prisma.credential.findMany({
    where: {
      OR: [{ userId }, { teamId: { in: userTeamIds.map((membership) => membership.teamId) } }],
      invalid: true,
    },
    select: {
      appId: true,
    },
  });

  const appNamesAndSlugs: InvalidAppCredentialBannerProps[] = [];
  for (const app of apps) {
    if (app.appId) {
      const appId = app.appId;
      const appMeta = await getAppFromSlug(appId);
      const name = appMeta ? appMeta.name : appId;
      appNamesAndSlugs.push({ slug: appId, name });
    }
  }

  return appNamesAndSlugs;
};

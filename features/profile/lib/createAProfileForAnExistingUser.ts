import { getOrgFullOrigin } from "@bookph/core/ee/organizations/lib/orgDomains";
import { getOrgUsernameFromEmail } from "@bookph/core/features/auth/signup/utils/getOrgUsernameFromEmail";
import { TeamRepository } from "@bookph/core/features/ee/teams/repositories/TeamRepository";
import { ProfileRepository } from "@bookph/core/features/profile/repositories/ProfileRepository";
import { UserRepository } from "@bookph/core/features/users/repositories/UserRepository";
import logger from "@bookph/core/lib/logger";
import { safeStringify } from "@bookph/core/lib/safeStringify";
import prisma from "@bookph/core/prisma";
import { RedirectType } from "@bookph/core/prisma/enums";

const log = logger.getSubLogger({ prefix: ["lib", "createAProfileForAnExistingUser"] });
export const createAProfileForAnExistingUser = async ({
  user,
  organizationId,
}: {
  user: {
    email: string;
    id: number;
    currentUsername: string | null;
  };
  organizationId: number;
}) => {
  const teamRepo = new TeamRepository(prisma);
  const org = await teamRepo.findById({ id: organizationId });
  if (!org) {
    throw new Error(`Organization with id ${organizationId} not found`);
  }

  const existingProfile = await ProfileRepository.findByUserIdAndOrgId({
    userId: user.id,
    organizationId,
  });

  if (existingProfile) {
    return existingProfile;
  }

  const usernameInOrg = getOrgUsernameFromEmail(
    user.email,
    org.organizationSettings?.orgAutoAcceptEmail ?? null
  );
  const profile = await ProfileRepository.createForExistingUser({
    userId: user.id,
    organizationId,
    username: usernameInOrg,
    email: user.email,
    movedFromUserId: user.id,
  });

  const userRepo = new UserRepository(prisma);
  await userRepo.updateWhereId({
    whereId: user.id,
    data: {
      movedToProfileId: profile.id,
    },
  });

  log.debug(
    "Created profile for user",
    safeStringify({ userId: user.id, profileId: profile.id, usernameInOrg, username: user.currentUsername })
  );

  const orgSlug = org.slug || org.requestedSlug;

  if (!orgSlug) {
    throw new Error(`Organization with id ${organizationId} doesn't have a slug`);
  }

  const orgUrl = getOrgFullOrigin(orgSlug);

  if (org.isPlatform) {
    // We don't want redirects for Platform Organizations
    return profile;
  }

  if (user.currentUsername) {
    log.debug(`Creating redirect for user ${user.currentUsername} to ${orgUrl}/${usernameInOrg}`);
    await prisma.tempOrgRedirect.upsert({
      where: {
        from_type_fromOrgId: {
          from: user.currentUsername,
          type: RedirectType.User,
          fromOrgId: 0,
        },
      },
      update: {
        type: RedirectType.User,
        from: user.currentUsername,
        fromOrgId: 0,
        toUrl: `${orgUrl}/${usernameInOrg}`,
      },
      create: {
        type: RedirectType.User,
        from: user.currentUsername,
        fromOrgId: 0,
        toUrl: `${orgUrl}/${usernameInOrg}`,
      },
    });
  } else {
    log.debug(`Skipping redirect setup as ${user.id} doesn't have a username`);
  }
  return profile;
};

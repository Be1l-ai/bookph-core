import createUsersAndConnectToOrg from "@bookph/core/features/ee/dsync/lib/users/createUsersAndConnectToOrg";
import { getOrganizationRepository } from "@bookph/core/features/ee/organizations/di/OrganizationRepository.container";
import { HOSTED_CAL_FEATURES } from "@bookph/core/lib/constants";
import type { PrismaClient } from "@bookph/core/prisma";
import { IdentityProvider } from "@bookph/core/prisma/enums";
import { ErrorCode } from "@bookph/core/lib/errorCodes";
import { ErrorWithCode } from "@bookph/core/lib/errors";

import jackson from "./jackson";
import { tenantPrefix, samlProductID } from "./saml";

const getAllAcceptedMemberships = async ({ prisma, email }: { prisma: PrismaClient; email: string }) => {
  return await prisma.membership.findMany({
    select: {
      teamId: true,
    },
    where: {
      accepted: true,
      user: {
        email,
      },
    },
  });
};

export const ssoTenantProduct = async (prisma: PrismaClient, email: string) => {
  const { connectionController } = await jackson();

  let memberships = await getAllAcceptedMemberships({ prisma, email });

  if (!memberships || memberships.length === 0) {
    if (!HOSTED_CAL_FEATURES) throw new ErrorWithCode(ErrorCode.Unauthorized, "no_account_exists");

    const domain = email.split("@")[1];
    const organizationRepository = getOrganizationRepository();
    const organization = await organizationRepository.getVerifiedOrganizationByAutoAcceptEmailDomain(domain);

    if (!organization) throw new ErrorWithCode(ErrorCode.Unauthorized, "no_account_exists");

    const createUsersAndConnectToOrgProps = {
      emailsToCreate: [email],
      identityProvider: IdentityProvider.SAML,
      identityProviderId: email,
    };

    await createUsersAndConnectToOrg({
      createUsersAndConnectToOrgProps,
      org: organization,
    });
    memberships = await getAllAcceptedMemberships({ prisma, email });

    if (!memberships || memberships.length === 0)
      throw new ErrorWithCode(ErrorCode.Unauthorized, "no_account_exists");
  }

  // Check SSO connections for each team user is a member of
  // We'll use the first one we find
  const promises = memberships.map(({ teamId }) =>
    connectionController.getConnections({
      tenant: `${tenantPrefix}${teamId}`,
      product: samlProductID,
    })
  );

  const connectionResults = await Promise.allSettled(promises);

  const connectionsFound = connectionResults
    .filter((result) => result.status === "fulfilled")
    .map((result) => (result.status === "fulfilled" ? result.value : []))
    .filter((connections) => connections.length > 0);

  if (connectionsFound.length === 0) {
    throw new ErrorWithCode(
      ErrorCode.BadRequest,
      "Could not find a SSO Identity Provider for your email. Please contact your admin to ensure you have been given access to Cal"
    );
  }

  return {
    tenant: connectionsFound[0][0].tenant,
    product: samlProductID,
  };
};

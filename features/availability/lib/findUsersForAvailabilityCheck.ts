import { enrichUserWithDelegationCredentialsIncludeServiceAccountKey } from "@bookph/core/app-store/delegationCredential";
import { withSelectedCalendars } from "@bookph/core/lib/server/withSelectedCalendars";
import { availabilityUserSelect } from "@bookph/core/prisma";
import { prisma } from "@bookph/core/prisma";
import type { Prisma } from "@bookph/core/prisma/client";
import { credentialForCalendarServiceSelect } from "@bookph/core/prisma/selects/credential";

export async function findUsersForAvailabilityCheck({ where }: { where: Prisma.UserWhereInput }) {
  const user = await prisma.user.findFirst({
    where,
    select: {
      ...availabilityUserSelect,
      selectedCalendars: true,
      credentials: {
        select: credentialForCalendarServiceSelect,
      },
    },
  });

  if (!user) {
    return null;
  }

  return await enrichUserWithDelegationCredentialsIncludeServiceAccountKey({
    user: withSelectedCalendars(user),
  });
}

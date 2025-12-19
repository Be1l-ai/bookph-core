/**
 * Simplified version of legacyListMembers.handler.ts that returns basic member info.
 * Used for filtering people on /bookings.
 */
import { PermissionCheckService } from "@bookph/core/features/pbac/services/permission-check.service";
import type { PrismaClient } from "@bookph/core/prisma";
import { MembershipRole } from "@bookph/core/prisma/enums";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

type ListSimpleMembersOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    prisma: PrismaClient;
  };
};

export const listSimpleMembers = async ({ ctx }: ListSimpleMembersOptions) => {
  const { prisma } = ctx;
  const { isOrgAdmin } = ctx.user.organization;
  const hasPermsToView = !ctx.user.organization.isPrivate || isOrgAdmin;

  if (!hasPermsToView) {
    return [];
  }

  const permissionCheckService = new PermissionCheckService();
  const teamsToQuery = await permissionCheckService.getTeamIdsWithPermission({
    userId: ctx.user.id,
    permission: "team.listMembers",
    fallbackRoles: [MembershipRole.OWNER, MembershipRole.ADMIN],
  });

  if (!teamsToQuery.length) {
    return [];
  }

  // Fetch unique users through memberships
  const members = (
    await prisma.membership.findMany({
      where: {
        accepted: true,
        teamId: { in: teamsToQuery },
      },
      select: {
        id: true,
        accepted: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatarUrl: true,
            email: true,
          },
        },
      },
      distinct: ["userId"],
      orderBy: [
        { userId: "asc" }, // First order by userId to ensure consistent ordering
        { id: "asc" }, // Then by id as secondary sort
      ],
    })
  ).map((membership) => membership.user);

  return members;
};

export default listSimpleMembers;

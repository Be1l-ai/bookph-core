import { TeamService } from "@bookph/core/features/ee/teams/services/teamService";

const removeUserFromOrg = async ({ userId, orgId }: { userId: number; orgId: number }) => {
  return TeamService.removeMembers({ teamIds: [orgId], userIds: [userId], isOrg: true });
};

export default removeUserFromOrg;

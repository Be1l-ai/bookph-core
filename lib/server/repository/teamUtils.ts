import type { Team } from "@bookph/core/prisma/client";
import { teamMetadataSchema } from "@bookph/core/prisma/zod-utils";

export const getParsedTeam = <T extends { metadata: Team["metadata"] }>(team: T) => {
  const metadata = teamMetadataSchema.parse(team.metadata);
  const requestedSlug = metadata?.requestedSlug ?? null;
  const { metadata: _1, ...rest } = team;
  return {
    ...rest,
    requestedSlug,
    metadata: {
      ...metadata,
      /**
       * @deprecated New orgs that are being created won't have requestedSlug set as the organizations are created after payment and thus slug is always available
       */
      requestedSlug,
    },
  };
};

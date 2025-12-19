import { FeaturesRepository } from "@bookph/core/features/flags/features.repository";
import prisma from "@bookph/core/prisma";
import publicProcedure from "@bookph/core/trpc/server/procedures/publicProcedure";

/**
 * TRPC procedure that returns a map of all feature flags and their enabled status.
 * Uses the FeaturesRepository to handle caching and database access.
 */
export const map = publicProcedure.query(async () => {
  const featuresRepository = new FeaturesRepository(prisma);
  return featuresRepository.getFeatureFlagMap();
});

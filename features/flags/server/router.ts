import { z } from "zod";

import type { AppFlags } from "@bookph/core/features/flags/config";
import { FeaturesRepository } from "@bookph/core/features/flags/features.repository";
import { prisma } from "@bookph/core/prisma";
import publicProcedure from "@bookph/core/trpc/server/procedures/publicProcedure";
import { router } from "@bookph/core/trpc/server/trpc";

import { map } from "./procedures/map";

export const featureFlagRouter = router({
  list: publicProcedure.query(async () => {
    const featuresRepository = new FeaturesRepository(prisma);
    return featuresRepository.getAllFeatures();
  }),
  checkTeamFeature: publicProcedure
    .input(
      z.object({
        teamId: z.number(),
        feature: z.string(),
      })
    )
    .query(async ({ input }) => {
      const featuresRepository = new FeaturesRepository(prisma);
      return featuresRepository.checkIfTeamHasFeature(input.teamId, input.feature as keyof AppFlags);
    }),
  map,
});

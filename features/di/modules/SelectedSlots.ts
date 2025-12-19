import { DI_TOKENS } from "@bookph/core/features/di/tokens";
import { PrismaSelectedSlotRepository } from "@bookph/core/lib/server/repository/PrismaSelectedSlotRepository";

import { createModule } from "../di";

export const selectedSlotsRepositoryModule = createModule();
selectedSlotsRepositoryModule
  .bind(DI_TOKENS.SELECTED_SLOT_REPOSITORY)
  .toClass(PrismaSelectedSlotRepository, [DI_TOKENS.PRISMA_CLIENT]);

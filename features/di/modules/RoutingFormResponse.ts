import { DI_TOKENS } from "@bookph/core/features/di/tokens";
import { RoutingFormResponseRepository } from "@bookph/core/lib/server/repository/formResponse";

import { createModule } from "../di";

export const routingFormResponseRepositoryModule = createModule();
routingFormResponseRepositoryModule
  .bind(DI_TOKENS.ROUTING_FORM_RESPONSE_REPOSITORY)
  .toClass(RoutingFormResponseRepository, [DI_TOKENS.PRISMA_CLIENT]);

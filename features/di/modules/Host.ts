import { moduleLoader as prismaModuleLoader } from "@bookph/core/features/di/modules/Prisma";
import { DI_TOKENS } from "@bookph/core/features/di/tokens";
import { HostRepository } from "@bookph/core/features/host/repositories/HostRepository";

import { createModule, bindModuleToClassOnToken, type ModuleLoader } from "../di";

export const hostRepositoryModule = createModule();
const token = DI_TOKENS.HOST_REPOSITORY;
const moduleToken = DI_TOKENS.HOST_REPOSITORY_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: hostRepositoryModule,
  moduleToken,
  token,
  classs: HostRepository,
  dep: prismaModuleLoader,
});

export const moduleLoader: ModuleLoader = {
  token,
  loadModule,
};

import { bindModuleToClassOnToken, createModule } from "@bookph/core/features/di/di";
import { OrganizationMembershipService } from "@bookph/core/features/ee/organizations/lib/service/OrganizationMembershipService";

import { moduleLoader as organizationRepositoryModuleLoader } from "./OrganizationRepository.module";
import { ORGANIZATION_DI_TOKENS } from "./tokens";

const thisModule = createModule();
const token = ORGANIZATION_DI_TOKENS.ORGANIZATION_MEMBERSHIP_SERVICE;
const moduleToken = ORGANIZATION_DI_TOKENS.ORGANIZATION_MEMBERSHIP_SERVICE_MODULE;

const loadModule = bindModuleToClassOnToken({
    module: thisModule,
    moduleToken,
    token,
    classs: OrganizationMembershipService,
    depsMap: {
        organizationRepository: organizationRepositoryModuleLoader,
    },
});

export const moduleLoader = {
    token,
    loadModule,
};

export type { OrganizationMembershipService };


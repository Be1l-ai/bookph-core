import type { FilterHostsService } from "@bookph/core/features/bookings/lib/host-filtering/filterHostsBySameRoundRobinHost";
import { DI_TOKENS } from "@bookph/core/features/di/tokens";
import { prismaModule } from "@bookph/core/features/di/modules/Prisma";

import { createContainer } from "../di";
import { bookingRepositoryModule } from "../modules/Booking";
import { filterHostsModule } from "../modules/FilterHosts";

const container = createContainer();
container.load(DI_TOKENS.PRISMA_MODULE, prismaModule);
container.load(DI_TOKENS.BOOKING_REPOSITORY_MODULE, bookingRepositoryModule);
container.load(DI_TOKENS.FILTER_HOSTS_SERVICE_MODULE, filterHostsModule);

export function getFilterHostsService() {
  return container.get<FilterHostsService>(DI_TOKENS.FILTER_HOSTS_SERVICE);
}

import type { UserAvailabilityService } from "@bookph/core/features/availability/lib/getUserAvailability";
import { DI_TOKENS } from "@bookph/core/features/di/tokens";
import { redisModule } from "@bookph/core/features/redis/di/redisModule";
import { prismaModule } from "@bookph/core/features/di/modules/Prisma";

import { createContainer } from "../di";
import { bookingRepositoryModule } from "../modules/Booking";
import { busyTimesModule } from "../modules/BusyTimes";
import { eventTypeRepositoryModule } from "../modules/EventType";
import { getUserAvailabilityModule } from "../modules/GetUserAvailability";
import { holidayRepositoryModule } from "../modules/Holiday";
import { oooRepositoryModule } from "../modules/Ooo";

const container = createContainer();
container.load(DI_TOKENS.PRISMA_MODULE, prismaModule);
container.load(DI_TOKENS.OOO_REPOSITORY_MODULE, oooRepositoryModule);
container.load(DI_TOKENS.BOOKING_REPOSITORY_MODULE, bookingRepositoryModule);
container.load(DI_TOKENS.EVENT_TYPE_REPOSITORY_MODULE, eventTypeRepositoryModule);
container.load(DI_TOKENS.HOLIDAY_REPOSITORY_MODULE, holidayRepositoryModule);
container.load(DI_TOKENS.GET_USER_AVAILABILITY_SERVICE_MODULE, getUserAvailabilityModule);
container.load(DI_TOKENS.BUSY_TIMES_SERVICE_MODULE, busyTimesModule);
container.load(DI_TOKENS.REDIS_CLIENT, redisModule);

export function getUserAvailabilityService() {
  return container.get<UserAvailabilityService>(DI_TOKENS.GET_USER_AVAILABILITY_SERVICE);
}

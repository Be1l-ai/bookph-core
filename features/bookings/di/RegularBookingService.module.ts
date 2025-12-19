import { moduleLoader as bookingEventHandlerModuleLoader } from "@bookph/core/features/bookings/di/BookingEventHandlerService.module";
import { RegularBookingService } from "@bookph/core/features/bookings/lib/service/RegularBookingService";
import { bindModuleToClassOnToken, createModule, type ModuleLoader } from "@bookph/core/features/di/di";
import { moduleLoader as bookingRepositoryModuleLoader } from "@bookph/core/features/di/modules/Booking";
import { moduleLoader as checkBookingAndDurationLimitsModuleLoader } from "@bookph/core/features/di/modules/CheckBookingAndDurationLimits";
import { moduleLoader as featuresRepositoryModuleLoader } from "@bookph/core/features/di/modules/Features";
import { moduleLoader as luckyUserServiceModuleLoader } from "@bookph/core/features/di/modules/LuckyUser";
import { moduleLoader as prismaModuleLoader } from "@bookph/core/features/di/modules/Prisma";
import { moduleLoader as userRepositoryModuleLoader } from "@bookph/core/features/di/modules/User";
import { DI_TOKENS } from "@bookph/core/features/di/tokens";
import { moduleLoader as hashedLinkServiceModuleLoader } from "@bookph/core/features/hashedLink/di/HashedLinkService.module";

import { moduleLoader as bookingEmailAndSmsTaskerModuleLoader } from "./tasker/BookingEmailAndSmsTasker.module";

const thisModule = createModule();
const token = DI_TOKENS.REGULAR_BOOKING_SERVICE;
const moduleToken = DI_TOKENS.REGULAR_BOOKING_SERVICE_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  moduleToken,
  token,
  classs: RegularBookingService,
  depsMap: {
    // TODO: In a followup PR, we aim to remove prisma dependency and instead inject the repositories as dependencies.
    prismaClient: prismaModuleLoader,
    checkBookingAndDurationLimitsService: checkBookingAndDurationLimitsModuleLoader,
    bookingRepository: bookingRepositoryModuleLoader,
    luckyUserService: luckyUserServiceModuleLoader,
    userRepository: userRepositoryModuleLoader,
    hashedLinkService: hashedLinkServiceModuleLoader,
    bookingEmailAndSmsTasker: bookingEmailAndSmsTaskerModuleLoader,
    featuresRepository: featuresRepositoryModuleLoader,
    bookingEventHandler: bookingEventHandlerModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
} satisfies ModuleLoader;

export type { RegularBookingService };

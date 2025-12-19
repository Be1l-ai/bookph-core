import { BookingEventHandlerService } from "@bookph/core/features/bookings/lib/onBookingEvents/BookingEventHandlerService";
import { bindModuleToClassOnToken, createModule } from "@bookph/core/features/di/di";
import { DI_TOKENS } from "@bookph/core/features/di/tokens";
import { moduleLoader as hashedLinkServiceModuleLoader } from "@bookph/core/features/hashedLink/di/HashedLinkService.module";
import { moduleLoader as bookingAuditProducerServiceModuleLoader } from "@bookph/core/features/booking-audit/di/BookingAuditTaskerProducerService.module";
import { moduleLoader as loggerModuleLoader } from "@bookph/core/features/di/shared/services/logger.service";

const thisModule = createModule();
const token = DI_TOKENS.BOOKING_EVENT_HANDLER_SERVICE;
const moduleToken = DI_TOKENS.BOOKING_EVENT_HANDLER_SERVICE_MODULE;

const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  moduleToken,
  token,
  classs: BookingEventHandlerService,
  depsMap: {
    hashedLinkService: hashedLinkServiceModuleLoader,
    bookingAuditProducerService: bookingAuditProducerServiceModuleLoader,
    log: loggerModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
};

export type { BookingEventHandlerService };

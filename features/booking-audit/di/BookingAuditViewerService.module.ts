import { BookingAuditViewerService } from "@bookph/core/features/booking-audit/lib/service/BookingAuditViewerService";
import { BOOKING_AUDIT_DI_TOKENS } from "@bookph/core/features/booking-audit/di/tokens";
import { moduleLoader as bookingAuditRepositoryModuleLoader } from "@bookph/core/features/booking-audit/di/BookingAuditRepository.module";
import { moduleLoader as userRepositoryModuleLoader } from "@bookph/core/features/di/modules/User";
import { moduleLoader as bookingRepositoryModuleLoader } from "@bookph/core/features/di/modules/Booking";
import { moduleLoader as loggerModuleLoader } from "@bookph/core/features/di/shared/services/logger.service";

import { createModule, bindModuleToClassOnToken } from "../../di/di";

export const bookingAuditViewerServiceModule = createModule();
const token = BOOKING_AUDIT_DI_TOKENS.BOOKING_AUDIT_VIEWER_SERVICE;
const moduleToken = BOOKING_AUDIT_DI_TOKENS.BOOKING_AUDIT_VIEWER_SERVICE_MODULE;

export { BookingAuditViewerService }

const loadModule = bindModuleToClassOnToken({
  module: bookingAuditViewerServiceModule,
  moduleToken,
  token,
  classs: BookingAuditViewerService,
  depsMap: {
    bookingAuditRepository: bookingAuditRepositoryModuleLoader,
    userRepository: userRepositoryModuleLoader,
    bookingRepository: bookingRepositoryModuleLoader,
    log: loggerModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule
};


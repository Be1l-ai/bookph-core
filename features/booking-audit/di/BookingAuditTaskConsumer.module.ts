import { BookingAuditTaskConsumer } from "@bookph/core/features/booking-audit/lib/service/BookingAuditTaskConsumer";
import { BOOKING_AUDIT_DI_TOKENS } from "@bookph/core/features/booking-audit/di/tokens";
import { moduleLoader as bookingAuditRepositoryModuleLoader } from "@bookph/core/features/booking-audit/di/BookingAuditRepository.module";
import { moduleLoader as auditActorRepositoryModuleLoader } from "@bookph/core/features/booking-audit/di/AuditActorRepository.module";
import { moduleLoader as featuresRepositoryModuleLoader } from "@bookph/core/features/di/modules/Features";
import { moduleLoader as userRepositoryModuleLoader } from "@bookph/core/features/di/modules/User";

import { createModule, bindModuleToClassOnToken } from "../../di/di";

export const bookingAuditTaskConsumerModule = createModule();
const token = BOOKING_AUDIT_DI_TOKENS.BOOKING_AUDIT_TASK_CONSUMER;
const moduleToken = BOOKING_AUDIT_DI_TOKENS.BOOKING_AUDIT_TASK_CONSUMER_MODULE;

const loadModule = bindModuleToClassOnToken({
  module: bookingAuditTaskConsumerModule,
  moduleToken,
  token,
  classs: BookingAuditTaskConsumer,
  depsMap: {
    bookingAuditRepository: bookingAuditRepositoryModuleLoader,
    auditActorRepository: auditActorRepositoryModuleLoader,
    featuresRepository: featuresRepositoryModuleLoader,
    userRepository: userRepositoryModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule
};


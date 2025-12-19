import { BookingCancelService } from "@bookph/core/features/bookings/lib/handleCancelBooking";
import { bindModuleToClassOnToken, createModule } from "@bookph/core/features/di/di";
import { DI_TOKENS } from "@bookph/core/features/di/tokens";
import { moduleLoader as prismaModuleLoader } from "@bookph/core/features/di/modules/Prisma";

const thisModule = createModule();
const token = DI_TOKENS.BOOKING_CANCEL_SERVICE;
const moduleToken = DI_TOKENS.BOOKING_CANCEL_SERVICE_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  moduleToken,
  token,
  classs: BookingCancelService,
  depsMap: {
    prismaClient: prismaModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
};

export type { BookingCancelService };

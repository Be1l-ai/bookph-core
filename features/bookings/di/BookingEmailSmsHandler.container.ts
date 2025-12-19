import type { BookingEmailSmsHandler } from "@bookph/core/features/bookings/lib/BookingEmailSmsHandler";
import { createContainer } from "@bookph/core/features/di/di";

import { moduleLoader as BookingEmailSmsHandlerModule } from "./BookingEmailSmsHandler.module";

const container = createContainer();

export function getInstantBookingCreateService(): BookingEmailSmsHandler {
  BookingEmailSmsHandlerModule.loadModule(container);
  return container.get<BookingEmailSmsHandler>(BookingEmailSmsHandlerModule.token);
}

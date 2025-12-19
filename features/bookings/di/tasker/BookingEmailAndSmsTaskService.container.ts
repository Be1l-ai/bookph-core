import { BookingEmailAndSmsTaskService } from "@bookph/core/features/bookings/lib/tasker/BookingEmailAndSmsTaskService";
import { createContainer } from "@bookph/core/features/di/di";

import { moduleLoader as BookingEmailAndSmsTaskServiceModule } from "./BookingEmailAndSmsTaskService.module";

const container = createContainer();

export function getBookingEmailAndSmsTaskService(): BookingEmailAndSmsTaskService {
  BookingEmailAndSmsTaskServiceModule.loadModule(container);
  return container.get<BookingEmailAndSmsTaskService>(BookingEmailAndSmsTaskServiceModule.token);
}

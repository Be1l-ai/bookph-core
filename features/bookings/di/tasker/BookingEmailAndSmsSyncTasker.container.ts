import { BookingEmailAndSmsSyncTasker } from "@bookph/core/features/bookings/lib/tasker/BookingEmailAndSmsSyncTasker";
import { createContainer } from "@bookph/core/features/di/di";

import { moduleLoader as BookingEmailAndSmsSyncTaskerModule } from "./BookingEmailAndSmsSyncTasker.module";

const container = createContainer();

export function getBookingEmailAndSmsSyncTasker(): BookingEmailAndSmsSyncTasker {
  BookingEmailAndSmsSyncTaskerModule.loadModule(container);
  return container.get<BookingEmailAndSmsSyncTasker>(BookingEmailAndSmsSyncTaskerModule.token);
}

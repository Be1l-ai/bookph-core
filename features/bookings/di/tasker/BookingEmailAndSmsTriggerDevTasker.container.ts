import { BookingEmailAndSmsTriggerDevTasker } from "@bookph/core/features/bookings/lib/tasker/BookingEmailAndSmsTriggerTasker";
import { createContainer } from "@bookph/core/features/di/di";

import { moduleLoader as BookingEmailAndSmsTriggerDevTaskerModule } from "./BookingEmailAndSmsTriggerDevTasker.module";

const container = createContainer();

export function getBookingEmailAndSmsTriggerDevTasker(): BookingEmailAndSmsTriggerDevTasker {
  BookingEmailAndSmsTriggerDevTaskerModule.loadModule(container);
  return container.get<BookingEmailAndSmsTriggerDevTasker>(BookingEmailAndSmsTriggerDevTaskerModule.token);
}

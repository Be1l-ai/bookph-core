import { z } from "zod";

import { BookingReportReason } from "@bookph/core/prisma/enums";

export const ZReportBookingInputSchema = z.object({
  bookingUid: z.string(),
  reason: z.nativeEnum(BookingReportReason),
  description: z.string().optional(),
});

export type TReportBookingInputSchema = z.infer<typeof ZReportBookingInputSchema>;

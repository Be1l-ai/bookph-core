import type { PrismaClient } from "@bookph/core/prisma/client";

import { getBookingAuditViewerService } from "@bookph/core/features/booking-audit/di/BookingAuditViewerService.container";

import type { TrpcSessionUser } from "../../../types";
import type { TGetAuditLogsInputSchema } from "./getAuditLogs.schema";

type GetAuditLogsOptions = {
    ctx: {
        user: NonNullable<TrpcSessionUser>;
        prisma: PrismaClient;
    };
    input: TGetAuditLogsInputSchema;
};

export const getAuditLogsHandler = async ({ ctx, input }: GetAuditLogsOptions) => {
    const { user } = ctx;
    const { bookingUid } = input;

    const bookingAuditViewerService = getBookingAuditViewerService();

    const result = await bookingAuditViewerService.getAuditLogsForBooking(
        bookingUid,
        user.id,
        user.email
    );

    return result;
};


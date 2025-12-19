import { roundRobinManualReassignment } from "@bookph/core/features/ee/round-robin/roundRobinManualReassignment";
import { getBookingAccessService } from "@bookph/core/features/di/containers/BookingAccessService";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import { TRPCError } from "@trpc/server";

import type { TRoundRobinManualReassignInputSchema } from "./roundRobinManualReassign.schema";

type RoundRobinManualReassignOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TRoundRobinManualReassignInputSchema;
};

export const roundRobinManualReassignHandler = async ({ ctx, input }: RoundRobinManualReassignOptions) => {
  const { bookingId, teamMemberId, reassignReason } = input;

  // Check if user has access to change booking
  const bookingAccessService = getBookingAccessService();
  const isAllowed = await bookingAccessService.doesUserIdHaveAccessToBooking({
    userId: ctx.user.id,
    bookingId,
  });

  if (!isAllowed) {
    throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission" });
  }

  await roundRobinManualReassignment({
    bookingId,
    newUserId: teamMemberId,
    orgId: ctx.user.organizationId,
    reassignReason,
    reassignedById: ctx.user.id,
  });

  return { success: true };
};

export default roundRobinManualReassignHandler;

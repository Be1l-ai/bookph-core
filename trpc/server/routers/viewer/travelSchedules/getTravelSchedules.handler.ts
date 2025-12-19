import { TravelScheduleRepository } from "@bookph/core/lib/server/repository/travelSchedule";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

type GetTravelSchedulesOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const getTravelSchedulesHandler = async ({ ctx }: GetTravelSchedulesOptions) => {
  return await TravelScheduleRepository.findTravelSchedulesByUserId(ctx.user.id);
};

export {
  ScheduleRepository,
  type FindDetailedScheduleByIdReturnType,
} from "@bookph/core/features/schedules/repositories/ScheduleRepository";

export {
  updateSchedule,
  type UpdateScheduleResponse,
} from "@bookph/core/features/schedules/services/ScheduleService";
export { UserAvailabilityService } from "@bookph/core/features/availability/lib/getUserAvailability";

export {
  createHandler as createScheduleHandler,
  type CreateScheduleHandlerReturn,
} from "@bookph/core/trpc/server/routers/viewer/availability/schedule/create.handler";
export { ZCreateInputSchema as CreateScheduleSchema } from "@bookph/core/trpc/server/routers/viewer/availability/schedule/create.schema";

export {
  listHandler as getAvailabilityListHandler,
  type GetAvailabilityListHandlerReturn,
} from "@bookph/core/trpc/server/routers/viewer/availability/list.handler";
export {
  duplicateHandler as duplicateScheduleHandler,
  type DuplicateScheduleHandlerReturn,
} from "@bookph/core/trpc/server/routers/viewer/availability/schedule/duplicate.handler";

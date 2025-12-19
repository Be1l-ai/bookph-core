import EventManager from "@bookph/core/features/bookings/lib/EventManager";

export { getPublicEvent, type PublicEventType } from "@bookph/core/features/eventtypes/lib/getPublicEvent";

export { getBulkUserEventTypes, getBulkTeamEventTypes } from "@bookph/core/app-store/_utils/getBulkEventTypes";

export { createHandler as createEventType } from "@bookph/core/trpc/server/routers/viewer/eventTypes/heavy/create.handler";
export { updateHandler as updateEventType } from "@bookph/core/trpc/server/routers/viewer/eventTypes/heavy/update.handler";

export type { TUpdateInputSchema as TUpdateEventTypeInputSchema } from "@bookph/core/trpc/server/routers/viewer/eventTypes/heavy/update.schema";
export type { EventTypesPublic } from "@bookph/core/features/eventtypes/lib/getEventTypesPublic";
export { getEventTypesPublic } from "@bookph/core/features/eventtypes/lib/getEventTypesPublic";
export { parseEventTypeColor } from "@bookph/core/lib/isEventTypeColor";

export {
  EventTypeMetaDataSchema,
  eventTypeBookingFields,
  eventTypeLocations,
} from "@bookph/core/prisma/zod-utils";

export type { EventTypeMetadata } from "@bookph/core/prisma/zod-utils";

export { validateCustomEventName } from "@bookph/core/features/eventtypes/lib/eventNaming";
export { EventManager };
export { getEventTypeById } from "@bookph/core/features/eventtypes/lib/getEventTypeById";
export { getEventTypesByViewer } from "@bookph/core/features/eventtypes/lib/getEventTypesByViewer";
export type { EventType } from "@bookph/core/features/eventtypes/lib/getEventTypeById";
export type { EventTypesByViewer } from "@bookph/core/features/eventtypes/lib/getEventTypesByViewer";
export type { UpdateEventTypeReturn } from "@bookph/core/trpc/server/routers/viewer/eventTypes/heavy/update.handler";
export { updateNewTeamMemberEventTypes } from "@bookph/core/features/ee/teams/lib/queries";

export { bulkUpdateEventsToDefaultLocation } from "@bookph/core/app-store/_utils/bulkUpdateEventsToDefaultLocation";
export { bulkUpdateTeamEventsToDefaultLocation } from "@bookph/core/app-store/_utils/bulkUpdateTeamEventsToDefaultLocation";

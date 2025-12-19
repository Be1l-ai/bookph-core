import { getBookingForReschedule } from "@bookph/core/features/bookings/lib/get-booking";
import getAllUserBookings from "@bookph/core/features/bookings/lib/getAllUserBookings";
import { getBookingFieldsWithSystemFields } from "@bookph/core/features/bookings/lib/getBookingFields";
import getBookingInfo from "@bookph/core/features/bookings/lib/getBookingInfo";
import handleCancelBooking from "@bookph/core/features/bookings/lib/handleCancelBooking";
import { getClientSecretFromPayment } from "@bookph/core/features/ee/payments/pages/getClientSecretFromPayment";
import { getTeamMemberEmailForResponseOrContactUsingUrlQuery } from "@bookph/core/features/ee/teams/lib/getTeamMemberEmailFromCrm";
import {
  verifyPhoneNumber,
  sendVerificationCode,
} from "@bookph/core/features/ee/workflows/lib/reminders/verifyPhoneNumber";
import { handleCreatePhoneCall } from "@bookph/core/features/handleCreatePhoneCall";
import handleMarkNoShow from "@bookph/core/features/handleMarkNoShow";
import { getRoutedUrl } from "@bookph/core/features/routing-forms/lib/getRoutedUrl";
import { symmetricEncrypt, symmetricDecrypt } from "@bookph/core/lib/crypto";
import { getTranslation } from "@bookph/core/lib/server/i18n";
import type { Prisma } from "@bookph/core/prisma/client";
import { credentialForCalendarServiceSelect } from "@bookph/core/prisma/selects/credential";
import { paymentDataSelect } from "@bookph/core/prisma/selects/payment";
import { createNewUsersConnectToOrgIfExists } from "@bookph/core/trpc/server/routers/viewer/teams/inviteMember/utils";

export { slugify } from "@bookph/core/lib/slugify";
export { getBookingForReschedule };

export type { EventBusyDate } from "@bookph/core/types/Calendar";

export {
  CreationSource,
  SchedulingType,
  PeriodType,
  AttributeType,
  MembershipRole,
  TimeUnit,
  WebhookTriggerEvents,
  WorkflowTriggerEvents,
  WorkflowActions,
  WorkflowTemplates,
} from "@bookph/core/prisma/enums";

export { getUsernameList } from "@bookph/core/features/eventtypes/lib/defaultEvents";

export { handleMarkNoShow };
export { handleCreatePhoneCall };

export { getConnectedDestinationCalendarsAndEnsureDefaultsInDb } from "@bookph/core/features/calendars/lib/getConnectedDestinationCalendars";

export { getBusyCalendarTimes } from "@bookph/core/features/calendars/lib/CalendarManager";

export type { BookingCreateBody, BookingResponse } from "@bookph/core/features/bookings/types";
export { HttpError } from "@bookph/core/lib/http-error";

export { MINUTES_TO_BOOK, ENABLE_ASYNC_TASKER } from "@bookph/core/lib/constants";

export { cityTimezonesHandler } from "@bookph/core/features/cityTimezones/cityTimezonesHandler";
export type { CityTimezones } from "@bookph/core/features/cityTimezones/cityTimezonesHandler";

export { TRPCError } from "@trpc/server";
export { createNewUsersConnectToOrgIfExists };

export { getAllUserBookings };
export { getBookingInfo };
export { handleCancelBooking };

export { userMetadata, bookingMetadataSchema, teamMetadataSchema } from "@bookph/core/prisma/zod-utils";

export { parseBookingLimit } from "@bookph/core/lib/intervalLimits/isBookingLimits";

export { parseRecurringEvent } from "@bookph/core/lib/isRecurringEvent";
export { dynamicEvent } from "@bookph/core/features/eventtypes/lib/defaultEvents";

export { symmetricEncrypt, symmetricDecrypt };

export { getTranslation };

export { roundRobinReassignment } from "@bookph/core/features/ee/round-robin/roundRobinReassignment";
export { roundRobinManualReassignment } from "@bookph/core/features/ee/round-robin/roundRobinManualReassignment";

export { ErrorCode } from "@bookph/core/lib/errorCodes";

export { validateCustomEventName } from "@bookph/core/features/eventtypes/lib/eventNaming";

export type TeamQuery = Prisma.TeamGetPayload<{
  select: {
    id: true;
    credentials: {
      select: typeof import("@bookph/core/prisma/selects/credential").credentialForCalendarServiceSelect;
    };
    name: true;
    logoUrl: true;
    members: {
      select: {
        role: true;
      };
    };
  };
}>;

export { credentialForCalendarServiceSelect };
export { paymentDataSelect };
export { getClientSecretFromPayment };

export { confirmHandler as confirmBookingHandler } from "@bookph/core/trpc/server/routers/viewer/bookings/confirm.handler";
export { groupMembershipAttributes } from "@bookph/core/trpc/server/routers/viewer/attributes/getByUserId.handler";
export type { GroupedAttribute } from "@bookph/core/trpc/server/routers/viewer/attributes/getByUserId.handler";
export { getBookingFieldsWithSystemFields };

export { getRoutedUrl };

export { getTeamMemberEmailForResponseOrContactUsingUrlQuery };

export { SelectedCalendarRepository } from "@bookph/core/lib/server/repository/selectedCalendar";
export { encryptServiceAccountKey } from "@bookph/core/lib/server/serviceAccountKey";
export { createHandler as createApiKeyHandler } from "@bookph/core/trpc/server/routers/viewer/apiKeys/create.handler";
export { getCalendarLinks } from "@bookph/core/features/bookings/lib/getCalendarLinks";

export { findTeamMembersMatchingAttributeLogic } from "@bookph/core/app-store/_utils/raqb/findTeamMembersMatchingAttributeLogic";
export type { TFindTeamMembersMatchingAttributeLogicInputSchema } from "@bookph/core/trpc/server/routers/viewer/attributes/findTeamMembersMatchingAttributeLogic.schema";
export { checkAdminOrOwner } from "@bookph/core/features/auth/lib/checkAdminOrOwner";

export { verifyPhoneNumber, sendVerificationCode };

export { verifyCodeUnAuthenticated } from "@bookph/core/features/auth/lib/verifyCodeUnAuthenticated";

export { verifyCode as verifyCodeAuthenticated } from "@bookph/core/trpc/server/routers/viewer/organizations/verifyCode.handler";

export { sendEmailVerificationByCode } from "@bookph/core/features/auth/lib/verifyEmail";

export { checkEmailVerificationRequired } from "@bookph/core/trpc/server/routers/publicViewer/checkIfUserEmailVerificationRequired.handler";

export { TeamService } from "@bookph/core/features/ee/teams/services/teamService";

export { BookingAccessService } from "@bookph/core/features/bookings/services/BookingAccessService";
export { getTasker } from "@bookph/core/features/tasker/tasker-factory";
export type { Tasker } from "@bookph/core/features/tasker/tasker";

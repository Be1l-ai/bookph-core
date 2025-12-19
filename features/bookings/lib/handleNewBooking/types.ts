import type { TFunction } from "i18next";

import type { PaymentAppData } from "@bookph/core/app-store/_utils/payments/getPaymentAppData";
import type { EventTypeAppsList } from "@bookph/core/app-store/utils";
import type { GetUserAvailabilityResult } from "@bookph/core/features/availability/lib/getUserAvailability";
import type { userSelect } from "@bookph/core/prisma";
import type { App } from "@bookph/core/prisma/client";
import type { Prisma } from "@bookph/core/prisma/client";
import type { SelectedCalendar } from "@bookph/core/prisma/client";
import type { CredentialForCalendarService } from "@bookph/core/types/Credential";

type User = Omit<Prisma.UserGetPayload<{ select: typeof userSelect }>, "selectedCalendars">;

export type Invitee = {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  timeZone: string;
  phoneNumber?: string;
  language: {
    translate: TFunction;
    locale: string;
  };
}[];

export interface IEventTypePaymentCredentialType {
  appId: EventTypeAppsList;
  app: {
    categories: App["categories"];
    dirName: string;
  };
  key: Prisma.JsonValue;
}

export type IsFixedAwareUser = User & {
  isFixed: boolean;
  credentials: CredentialForCalendarService[];
  organization?: { slug: string };
  priority?: number;
  weight?: number;
  userLevelSelectedCalendars: SelectedCalendar[];
  allSelectedCalendars: SelectedCalendar[];
  groupId?: string | null;
  availabilityData?: GetUserAvailabilityResult;
};

export type { PaymentAppData };

export type Tracking = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

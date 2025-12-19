import { incompleteBookingAction as salesforceIncompleteBookingAction } from "@bookph/core/app-store/salesforce/lib/routingForm/incompleteBookingAction";
import type { App_RoutingForms_IncompleteBookingActions } from "@bookph/core/prisma/client";
import { IncompleteBookingActionType } from "@bookph/core/prisma/enums";

const incompleteBookingActionFunctions: Record<
  IncompleteBookingActionType,
  (action: App_RoutingForms_IncompleteBookingActions, email: string) => void
> = {
  [IncompleteBookingActionType.SALESFORCE]: salesforceIncompleteBookingAction,
};

export default incompleteBookingActionFunctions;

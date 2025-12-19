import type { z } from "zod";

import { routingFormIncompleteBookingDataSchema as salesforceRoutingFormIncompleteBookingDataSchema } from "@bookph/core/app-store/salesforce/zod";
import { IncompleteBookingActionType } from "@bookph/core/prisma/enums";

const incompleteBookingActionDataSchemas: Record<IncompleteBookingActionType, z.ZodType<any>> = {
  [IncompleteBookingActionType.SALESFORCE]: salesforceRoutingFormIncompleteBookingDataSchema,
};

export default incompleteBookingActionDataSchemas;

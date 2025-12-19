import type { SelectedSlots } from "@bookph/core/prisma/client";

export type SelectedSlot = Pick<
  SelectedSlots,
  "id" | "uid" | "eventTypeId" | "slotUtcStartDate" | "slotUtcEndDate" | "releaseAt" | "isSeat"
>;

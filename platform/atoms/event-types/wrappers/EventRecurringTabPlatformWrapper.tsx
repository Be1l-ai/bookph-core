import type { EventRecurringTabProps } from "@bookph/core/features/eventtypes/components/tabs/recurring/EventRecurringTab";
import { EventRecurringTab } from "@bookph/core/features/eventtypes/components/tabs/recurring/EventRecurringTab";

const EventRecurringTabPlatformWrapper = (props: EventRecurringTabProps) => {
  return <EventRecurringTab {...props} />;
};

export default EventRecurringTabPlatformWrapper;

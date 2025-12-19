import type { EventRecurringTabProps } from "@bookph/core/features/eventtypes/components/tabs/recurring/EventRecurringTab";
import { EventRecurringTab } from "@bookph/core/features/eventtypes/components/tabs/recurring/EventRecurringTab";

const EventRecurringWebWrapper = (props: EventRecurringTabProps) => {
  return <EventRecurringTab {...props} />;
};

export default EventRecurringWebWrapper;

import { shallow } from "zustand/shallow";

import type { Dayjs } from "@bookph/core/dayjs";
import dayjs from "@bookph/core/dayjs";
import { useBookerStoreContext } from "@bookph/core/features/bookings/Booker/BookerStoreProvider";
import type { DatePickerClassNames } from "@bookph/core/features/bookings/Booker/types";
import { DatePicker as DatePickerComponent } from "@bookph/core/features/calendars/DatePicker";
import { useNonEmptyScheduleDays } from "@bookph/core/features/schedules/lib/use-schedule/useNonEmptyScheduleDays";
import { weekdayToWeekIndex } from "@bookph/core/lib/dayjs";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import type { User } from "@bookph/core/prisma/client";
import type { PeriodData } from "@bookph/core/types/Event";

import type { Slots } from "../../types";

const useMoveToNextMonthOnNoAvailability = ({
  browsingDate,
  nonEmptyScheduleDays,
  onMonthChange,
  isLoading,
}: {
  browsingDate: Dayjs;
  nonEmptyScheduleDays: string[];
  isLoading: boolean;
  onMonthChange: (date: Dayjs) => void;
}) => {
  if (isLoading) {
    return {
      moveToNextMonthOnNoAvailability: () => {
        /* return noop until ready */
      },
    };
  }

  const nonEmptyScheduleDaysInBrowsingMonth = nonEmptyScheduleDays.filter((date) =>
    dayjs(date).isSame(browsingDate, "month")
  );

  const moveToNextMonthOnNoAvailability = () => {
    const currentMonth = dayjs().startOf("month").format("YYYY-MM");
    const browsingMonth = browsingDate.format("YYYY-MM");
    // Not meeting the criteria to move to next month
    // Has to be currentMonth and it must have all days unbookable
    if (currentMonth != browsingMonth || nonEmptyScheduleDaysInBrowsingMonth.length) {
      return;
    }
    onMonthChange(browsingDate.add(1, "month"));
  };
  return {
    moveToNextMonthOnNoAvailability,
  };
};

export const DatePicker = ({
  event,
  slots = {},
  isLoading,
  classNames,
  scrollToTimeSlots,
  showNoAvailabilityDialog,
}: {
  event: {
    data?: {
      subsetOfUsers: Pick<User, "weekStart">[];
      periodType?: PeriodData["periodType"];
      periodStartDate?: PeriodData["periodStartDate"];
      periodEndDate?: PeriodData["periodEndDate"];
      periodDays?: PeriodData["periodDays"];
      periodCountCalendarDays?: PeriodData["periodCountCalendarDays"];
    } | null;
  };
  slots?: Slots;
  isLoading?: boolean;
  classNames?: DatePickerClassNames;
  scrollToTimeSlots?: () => void;
  showNoAvailabilityDialog?: boolean;
}) => {
  const { i18n } = useLocale();
  const [month, selectedDate, layout] = useBookerStoreContext(
    (state) => [state.month, state.selectedDate, state.layout],
    shallow
  );

  const [setSelectedDate, setMonth, setDayCount] = useBookerStoreContext(
    (state) => [state.setSelectedDate, state.setMonth, state.setDayCount],
    shallow
  );

  const onMonthChange = (date: Dayjs) => {
    setMonth(date.format("YYYY-MM"));
    setSelectedDate({ date: date.format("YYYY-MM-DD") });
    setDayCount(null); // Whenever the month is changed, we nullify getting X days
  };

  const nonEmptyScheduleDays = useNonEmptyScheduleDays(slots);
  const browsingDate = month ? dayjs(month) : dayjs().startOf("month");

  const { moveToNextMonthOnNoAvailability } = useMoveToNextMonthOnNoAvailability({
    browsingDate,
    nonEmptyScheduleDays,
    onMonthChange,
    isLoading: isLoading ?? true,
  });
  moveToNextMonthOnNoAvailability();

  // Determine if this is a compact sidebar view based on layout
  const isCompact = layout !== "month_view" && layout !== "mobile";

  const periodData: PeriodData = {
    ...{
      periodType: "UNLIMITED",
      periodStartDate: null,
      periodEndDate: null,
      periodDays: null,
      periodCountCalendarDays: false,
    },
    ...(event?.data && {
      periodType: event.data.periodType,
      periodStartDate: event.data.periodStartDate,
      periodEndDate: event.data.periodEndDate,
      periodDays: event.data.periodDays,
      periodCountCalendarDays: event.data.periodCountCalendarDays,
    }),
  };
  return (
    <DatePickerComponent
      customClassNames={{
        datePickerTitle: classNames?.datePickerTitle,
        datePickerDays: classNames?.datePickerDays,
        datePickersDates: classNames?.datePickerDate,
        datePickerDatesActive: classNames?.datePickerDatesActive,
        datePickerToggle: classNames?.datePickerToggle,
      }}
      className={classNames?.datePickerContainer}
      isLoading={isLoading}
      onChange={(date: Dayjs | null, omitUpdatingParams?: boolean) => {
        setSelectedDate({
          date: date === null ? date : date.format("YYYY-MM-DD"),
          omitUpdatingParams,
          preventMonthSwitching: !isCompact, // Prevent month switching when in monthly view
        });
      }}
      onMonthChange={onMonthChange}
      includedDates={nonEmptyScheduleDays}
      locale={i18n.language}
      browsingDate={month ? dayjs(month) : undefined}
      selected={dayjs(selectedDate)}
      weekStart={weekdayToWeekIndex(event?.data?.subsetOfUsers?.[0]?.weekStart)}
      slots={slots}
      scrollToTimeSlots={scrollToTimeSlots}
      periodData={periodData}
      isCompact={isCompact}
      showNoAvailabilityDialog={showNoAvailabilityDialog}
    />
  );
};

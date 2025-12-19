import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { TimeFormat } from "@bookph/core/lib/timeFormat";
import { ToggleGroup } from "@bookph/ui/components/form";

import { useTimePreferences } from "../lib";

export const TimeFormatToggle = ({ customClassName }: { customClassName?: string }) => {
  const timeFormat = useTimePreferences((state) => state.timeFormat);
  const setTimeFormat = useTimePreferences((state) => state.setTimeFormat);
  const { t } = useLocale();

  return (
    <ToggleGroup
      customClassNames={customClassName}
      onValueChange={(newFormat) => {
        if (newFormat && newFormat !== timeFormat) setTimeFormat(newFormat as TimeFormat);
      }}
      defaultValue={timeFormat}
      value={timeFormat}
      options={[
        { value: TimeFormat.TWELVE_HOUR, label: t("12_hour_short") },
        { value: TimeFormat.TWENTY_FOUR_HOUR, label: t("24_hour_short") },
      ]}
    />
  );
};

"use client";

import { useMemo } from "react";

import { useDataTable } from "@bookph/core/features/data-table";
import NoSSR from "@bookph/core/lib/components/NoSSR";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { CURRENT_TIMEZONE } from "@bookph/core/lib/timezoneConstants";
import { Icon } from "@bookph/ui/components/icon";
import { Tooltip } from "@bookph/ui/components/tooltip";

const TimezoneBadgeContent = () => {
  const { t } = useLocale();
  const { timeZone: userTimezone } = useDataTable();

  const timezoneData = useMemo(() => {
    // Use Cal's standard CURRENT_TIMEZONE constant
    const browserTimezone = CURRENT_TIMEZONE;

    if (!browserTimezone || !userTimezone || browserTimezone === userTimezone) return null;

    const tooltipContent = t("timezone_mismatch_tooltip", {
      browserTimezone,
      userTimezone,
      interpolation: { escapeValue: false },
    });

    return {
      browser: browserTimezone,
      user: userTimezone,
      tooltipContent,
      badgeContent: userTimezone,
    };
  }, [userTimezone, t]);

  // Don't render anything if no timezone mismatch
  if (!timezoneData) {
    return null;
  }

  return (
    <Tooltip content={timezoneData.tooltipContent}>
      <Icon name="info" data-testid="timezone-mismatch-badge" className="text-subtle" />
    </Tooltip>
  );
};

export const TimezoneBadge = () => {
  return (
    <NoSSR fallback={null}>
      <TimezoneBadgeContent />
    </NoSSR>
  );
};

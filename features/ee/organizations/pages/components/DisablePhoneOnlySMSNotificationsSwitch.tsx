"use client";

import { useState } from "react";

import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import type { RouterOutputs } from "@bookph/core/trpc";
import { trpc } from "@bookph/core/trpc";
import { SettingsToggle } from "@bookph/ui/components/form";
import { showToast } from "@bookph/ui/components/toast";

interface GeneralViewProps {
  currentOrg: RouterOutputs["viewer"]["organizations"]["listCurrent"];
}

export const DisablePhoneOnlySMSNotificationsSwitch = ({ currentOrg }: GeneralViewProps) => {
  const { t } = useLocale();
  const utils = trpc.useUtils();
  const [disablePhoneOnlySMSNotificationsActive, setDisablePhoneOnlySMSNotificationsActive] = useState(
    !!currentOrg.organizationSettings.disablePhoneOnlySMSNotifications
  );

  const mutation = trpc.viewer.organizations.update.useMutation({
    onSuccess: async () => {
      showToast(t("settings_updated_successfully"), "success");
    },
    onError: () => {
      showToast(t("error_updating_settings"), "error");
    },
    onSettled: () => {
      utils.viewer.organizations.listCurrent.invalidate();
    },
  });

  return (
    <>
      <SettingsToggle
        toggleSwitchAtTheEnd={true}
        title={t("organization_disable_phone_only_sms_notifications_switch_title")}
        disabled={mutation?.isPending}
        description={t("organization_disable_phone_only_sms_notifications_switch_description")}
        checked={disablePhoneOnlySMSNotificationsActive}
        onCheckedChange={(checked) => {
          mutation.mutate({
            disablePhoneOnlySMSNotifications: checked,
          });
          setDisablePhoneOnlySMSNotificationsActive(checked);
        }}
        switchContainerClassName="mt-6"
      />
    </>
  );
};

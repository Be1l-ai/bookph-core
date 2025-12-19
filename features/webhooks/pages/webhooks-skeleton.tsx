"use client";

import SettingsHeader from "@bookph/core/features/settings/appDir/SettingsHeader";
import { APP_NAME } from "@bookph/core/lib/constants";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { SkeletonText, SkeletonContainer } from "@bookph/ui/components/skeleton";

export const SkeletonLoader = () => {
  const { t } = useLocale();
  return (
    <SettingsHeader
      title={t("webhooks")}
      description={t("add_webhook_description", { appName: APP_NAME })}
      borderInShellHeader={false}
      CTA={null}>
      <SkeletonContainer>
        <div className="divide-subtle border-subtle mt-6 stack-y-6 rounded-lg border px-6 py-4">
          <SkeletonText className="h-8 w-full" />
          <SkeletonText className="h-8 w-full" />
        </div>
      </SkeletonContainer>
    </SettingsHeader>
  );
};

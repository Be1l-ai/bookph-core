"use client";

import { useRouter } from "next/navigation";

import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { trpc } from "@bookph/core/trpc/react";
import type { RouterOutputs } from "@bookph/core/trpc/react";
import { showToast } from "@bookph/ui/components/toast";
import { TopBanner } from "@bookph/ui/components/top-banner";

export type TeamsUpgradeBannerProps = {
  data: RouterOutputs["viewer"]["me"]["getUserTopBanners"]["teamUpgradeBanner"];
};

export function TeamsUpgradeBanner({ data }: TeamsUpgradeBannerProps) {
  const { t } = useLocale();
  const router = useRouter();

  const publishTeamMutation = trpc.viewer.teams.publish.useMutation({
    onSuccess(data) {
      router.push(data.url);
    },
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  if (!data) return null;
  const [membership] = data;
  if (!membership) return null;

  return (
    <TopBanner
      text={t("team_upgrade_banner_description", { teamName: membership.team.name })}
      variant="warning"
      actions={
        <button
          className="border-b border-b-black"
          onClick={() => {
            publishTeamMutation.mutate({ teamId: membership.team.id });
          }}>
          {t("upgrade_banner_action")}
        </button>
      }
    />
  );
}

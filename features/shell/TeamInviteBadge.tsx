import { useTeamInvites } from "@bookph/core/features/billing/hooks/useHasPaidPlan";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { Badge } from "@bookph/ui/components/badge";

export function TeamInviteBadge() {
  const { isPending, listInvites } = useTeamInvites();
  const { t } = useLocale();

  if (isPending || !listInvites || listInvites.length === 0) return null;

  return <Badge variant="default">{t("invite_team_notifcation_badge")}</Badge>;
}

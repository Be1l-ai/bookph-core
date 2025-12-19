import type { AddMembersWithSwitchProps } from "@bookph/core/features/eventtypes/components/AddMembersWithSwitch";
import { AddMembersWithSwitch } from "@bookph/core/features/eventtypes/components/AddMembersWithSwitch";
import { trpc } from "@bookph/core/trpc";

export const AddMembersWithSwitchWebWrapper = ({ ...props }: AddMembersWithSwitchProps) => {
  const utils = trpc.useUtils();

  utils.viewer.appRoutingForms.getAttributesForTeam.prefetch({
    teamId: props.teamId,
  });
  return <AddMembersWithSwitch {...props} />;
};

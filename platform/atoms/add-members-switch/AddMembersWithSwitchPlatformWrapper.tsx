import type { AddMembersWithSwitchProps } from "@bookph/core/features/eventtypes/components/AddMembersWithSwitch";
import { AddMembersWithSwitch } from "@bookph/core/features/eventtypes/components/AddMembersWithSwitch";

export const AddMembersWithSwitchPlatformWrapper = ({ ...props }: AddMembersWithSwitchProps) => {
  return <AddMembersWithSwitch {...props} />;
};

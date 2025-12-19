import { useOrgBranding } from "@bookph/core/features/ee/organizations/context/provider";
import { WEBAPP_URL, WEBSITE_URL } from "@bookph/core/lib/constants";

export const useBookerUrl = () => {
  const orgBranding = useOrgBranding();
  return orgBranding?.fullDomain ?? WEBSITE_URL ?? WEBAPP_URL;
};

export const useEmbedBookerUrl = () => {
  const orgBranding = useOrgBranding();
  return orgBranding?.fullDomain ?? WEBAPP_URL;
};

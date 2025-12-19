import type { AppMeta } from "@bookph/core/types/App";

export const shouldRedirectToAppOnboarding = (appMetadata: AppMeta) => {
  const hasEventTypes = appMetadata?.extendsFeature == "EventType";
  return hasEventTypes;
};

import logger from "@bookph/core/lib/logger";
import type { AnalyticsService } from "@bookph/core/types/AnalyticsService";
import type { CredentialPayload } from "@bookph/core/types/Credential";

import { AnalyticsServiceMap } from "../analytics.services.generated";

const log = logger.getSubLogger({ prefix: ["AnalyticsManager"] });

export const getAnalyticsService = async ({
  credential,
}: {
  credential: CredentialPayload;
}): Promise<AnalyticsService | null> => {
  if (!credential || !credential.key) return null;
  const { type: analyticsType } = credential;

  const analyticsName = analyticsType.split("_")[0];

  const analyticsAppImportFn = AnalyticsServiceMap[analyticsName as keyof typeof AnalyticsServiceMap];

  if (!analyticsAppImportFn) {
    log.warn(`analytics app not implemented`);
    return null;
  }

  const analyticsApp = await analyticsAppImportFn;

  const AnalyticsService = analyticsApp.default;

  if (!AnalyticsService || typeof AnalyticsService !== "function") {
    log.warn(`analytics of type ${analyticsType} is not implemented`);
    return null;
  }

  return new AnalyticsService(credential);
};

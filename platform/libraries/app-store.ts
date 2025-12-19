import getEnabledAppsFromCredentials from "@bookph/core/app-store/_utils/getEnabledAppsFromCredentials";
import getApps from "@bookph/core/app-store/utils";
import handleDeleteCredential from "@bookph/core/features/credentials/handleDeleteCredential";
import addDelegationCredential from "@bookph/core/trpc/server/routers/viewer/delegationCredential/add.handler";

export type { TDependencyData } from "@bookph/core/app-store/_appRegistry";

export type { CredentialOwner } from "@bookph/core/app-store/types";
export { CalendarService as IcsFeedCalendarService } from "@bookph/core/app-store/ics-feedcalendar/lib";
export { getAppFromSlug } from "@bookph/core/app-store/utils";
export type { CredentialDataWithTeamName, LocationOption } from "@bookph/core/app-store/utils";

export { CalendarService } from "@bookph/core/app-store/applecalendar/lib";

export { getApps };

export { handleDeleteCredential };

export type { App } from "@bookph/core/types/App";

export { getEnabledAppsFromCredentials };

export { getConnectedApps } from "@bookph/core/app-store/_utils/getConnectedApps";

export type { TServiceAccountKeySchema } from "@bookph/core/prisma/zod-utils";

export type { ConnectedApps } from "@bookph/core/app-store/_utils/getConnectedApps";

export type { AppsStatus } from "@bookph/core/types/Calendar";

export type { CredentialPayload } from "@bookph/core/types/Credential";

export { addDelegationCredential };

export { enrichUserWithDelegationConferencingCredentialsWithoutOrgId } from "@bookph/core/app-store/delegationCredential";
export { toggleDelegationCredentialEnabled } from "@bookph/core/trpc/server/routers/viewer/delegationCredential/toggleEnabled.handler";
export {
  CalendarAppError,
  CalendarAppDelegationCredentialInvalidGrantError,
  CalendarAppDelegationCredentialError,
  CalendarAppDelegationCredentialConfigurationError,
  CalendarAppDelegationCredentialClientIdNotAuthorizedError,
  CalendarAppDelegationCredentialNotSetupError,
} from "@bookph/core/lib/CalendarAppError";

export { DelegationCredentialRepository } from "@bookph/core/features/delegation-credentials/repositories/DelegationCredentialRepository";

export { OAuth2UniversalSchema } from "@bookph/core/app-store/_utils/oauth/universalSchema";
export { getUsersCredentialsIncludeServiceAccountKey } from "@bookph/core/app-store/delegationCredential";

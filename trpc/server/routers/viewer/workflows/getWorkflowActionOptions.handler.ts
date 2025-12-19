import { getWorkflowActionOptions } from "@bookph/core/features/ee/workflows/lib/getOptions";
import { getTranslation } from "@bookph/core/lib/server/i18n";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

type GetWorkflowActionOptionsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser> & {
      locale: string;
    };
  };
};

export const getWorkflowActionOptionsHandler = async ({ ctx }: GetWorkflowActionOptionsOptions) => {
  const { user } = ctx;

  const t = await getTranslation(ctx.user.locale, "common");

  return getWorkflowActionOptions(t, !!user.profile?.organizationId);
};

import { getBrand } from "@bookph/core/features/ee/organizations/lib/getBrand";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

type VerifyCodeOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const getBrandHandler = async ({ ctx }: VerifyCodeOptions) => {
  const { user } = ctx;

  if (!user.organizationId) return null;

  return await getBrand(user.organizationId);
};

export default getBrandHandler;

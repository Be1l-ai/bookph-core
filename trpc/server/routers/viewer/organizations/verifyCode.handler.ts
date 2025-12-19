import { createHash } from "crypto";

import { checkRateLimitAndThrowError } from "@bookph/core/lib/checkRateLimitAndThrowError";
import { IS_PRODUCTION } from "@bookph/core/lib/constants";
import logger from "@bookph/core/lib/logger";
import { hashEmail } from "@bookph/core/lib/server/PiiHasher";
import { totpRawCheck } from "@bookph/core/lib/totp";
import type { ZVerifyCodeInputSchema } from "@bookph/core/prisma/zod-utils";
import type { TrpcSessionUser } from "@bookph/core/trpc/server/types";

import { TRPCError } from "@trpc/server";

type VerifyCodeOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: ZVerifyCodeInputSchema;
};

export const verifyCodeHandler = async ({ ctx, input }: VerifyCodeOptions) => {
  return verifyCode({
    user: ctx.user,
    email: input.email,
    code: input.code,
  });
};

export const verifyCode = async ({
  user,
  email,
  code,
}: {
  user?: Pick<NonNullable<TrpcSessionUser>, "role">;
  email?: string;
  code?: string;
}) => {
  if (!user || !email || !code) throw new TRPCError({ code: "BAD_REQUEST" });

  if (!IS_PRODUCTION || process.env.NEXT_PUBLIC_IS_E2E) {
    logger.warn(`Skipping code verification in dev/E2E environment`);
    return true;
  }

  if (user.role === "ADMIN") {
    logger.warn(`Skipping code verification for instance admin`);
    return true;
  }

  await checkRateLimitAndThrowError({
    rateLimitingType: "core",
    identifier: `verifyCode:${hashEmail(email)}`,
  });

  const secret = createHash("md5")
    .update(email + process.env.CALENDSO_ENCRYPTION_KEY)
    .digest("hex");

  const isValidToken = totpRawCheck(code, secret, { step: 900 });

  if (!isValidToken) throw new TRPCError({ code: "BAD_REQUEST", message: "invalid_code" });

  return isValidToken;
};

export default verifyCodeHandler;

import { UserRepository } from "@bookph/core/features/users/repositories/UserRepository";
import prisma from "@bookph/core/prisma";

import type { TrpcSessionUser } from "../../../types";
import type { TWhitelistUserWorkflows } from "./whitelistUserWorkflows.schema";

type GetOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TWhitelistUserWorkflows;
};

export const whitelistUserWorkflows = async ({ input }: GetOptions) => {
  const { userId, whitelistWorkflows } = input;

  const user = await new UserRepository(prisma).updateWhitelistWorkflows({
    id: userId,
    whitelistWorkflows,
  });

  return { whitelistWorkflows: user.whitelistWorkflows };
};

export default whitelistUserWorkflows;

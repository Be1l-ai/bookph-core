import { PrismaPhoneNumberRepository } from "@bookph/core/features/calAIPhone/repositories/PrismaPhoneNumberRepository";
import prisma from "@bookph/core/prisma";

import type { TrpcSessionUser } from "../../../types";
import type { TListInputSchema } from "./list.schema";

type ListHandlerOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TListInputSchema;
};

export const listHandler = async ({ ctx, input }: ListHandlerOptions) => {
  const phoneNumberRepo = new PrismaPhoneNumberRepository(prisma);
  return await phoneNumberRepo.findManyWithUserAccess({
    userId: ctx.user.id,
    teamId: input?.teamId,
    scope: input?.scope || "all",
  });
};

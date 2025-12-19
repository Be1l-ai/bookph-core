import { z } from "zod";

import { emailSchema } from "@bookph/core/lib/emailSchema";
import slugify from "@bookph/core/lib/slugify";
import { CreationSource } from "@bookph/core/prisma/enums";

export enum BillingPeriod {
  MONTHLY = "MONTHLY",
  ANNUALLY = "ANNUALLY",
}

export const ZCreateInputSchema = z.object({
  name: z.string(),
  slug: z.string().transform((val) => slugify(val.trim())),
  orgOwnerEmail: emailSchema,
  language: z.string().optional(),
  seats: z.number().optional(),
  pricePerSeat: z.number().optional(),
  isPlatform: z.boolean().default(false),
  billingPeriod: z.nativeEnum(BillingPeriod).default(BillingPeriod.MONTHLY).optional(),
  creationSource: z.nativeEnum(CreationSource),
});

export type TCreateInputSchema = z.infer<typeof ZCreateInputSchema>;

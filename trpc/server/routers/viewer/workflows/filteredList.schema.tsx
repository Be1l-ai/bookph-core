"use client";

import { z } from "zod";

import { filterQuerySchemaStrict } from "@bookph/core/features/filters/lib/getTeamsFiltersFromQuery";

export const ZFilteredListInputSchema = z
  .object({
    filters: filterQuerySchemaStrict.optional(),
  })
  .nullish();

export type TFilteredListInputSchema = z.infer<typeof ZFilteredListInputSchema>;

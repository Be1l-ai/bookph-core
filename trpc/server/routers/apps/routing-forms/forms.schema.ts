import { z } from "zod";

import { filterQuerySchemaStrict } from "@bookph/core/features/filters/lib/getTeamsFiltersFromQuery";

export const ZFormsInputSchema = z
  .object({
    filters: filterQuerySchemaStrict.optional(),
  })
  .nullish();

export type TFormSchema = z.infer<typeof ZFormsInputSchema>;

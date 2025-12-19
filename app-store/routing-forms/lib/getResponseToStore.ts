import type { z } from "zod";

import getFieldIdentifier from "@bookph/core/app-store/routing-forms/lib/getFieldIdentifier";
import { getFieldResponseForJsonLogic } from "@bookph/core/app-store/routing-forms/lib/transformResponse";
import type { FormResponse } from "@bookph/core/app-store/routing-forms/types/types";

import type { zodFields } from "../zod";

export const getResponseToStore = ({
  formFields,
  fieldsResponses,
}: {
  formFields: NonNullable<z.infer<typeof zodFields>>;
  fieldsResponses: Record<string, string | string[]>;
}) => {
  const response: FormResponse = {};
  formFields.forEach((field) => {
    const fieldResponse = fieldsResponses[getFieldIdentifier(field)] || "";

    response[field.id] = {
      label: field.label,
      value: getFieldResponseForJsonLogic({ field, value: fieldResponse }),
    };
  });
  return response;
};

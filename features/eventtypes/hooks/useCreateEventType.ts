import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { createEventTypeInput } from "@bookph/core/features/eventtypes/lib/types";
import { useDebounce } from "@bookph/core/lib/hooks/useDebounce";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { HttpError } from "@bookph/core/lib/http-error";
import type { EventType } from "@bookph/core/prisma/client";
import { SchedulingType } from "@bookph/core/prisma/enums";
import { unlockedManagedEventTypeProps } from "@bookph/core/prisma/zod-utils";
import { trpc } from "@bookph/core/trpc/react";

export type CreateEventTypeFormValues = z.infer<typeof createEventTypeInput>;

export const useCreateEventTypeForm = () => {
  const form = useForm<CreateEventTypeFormValues>({
    defaultValues: {
      length: 15,
    },
    resolver: zodResolver(createEventTypeInput),
  });

  const schedulingTypeWatch = form.watch("schedulingType");
  const isManagedEventType = schedulingTypeWatch === SchedulingType.MANAGED;

  useEffect(() => {
    if (isManagedEventType) {
      form.setValue("metadata.managedEventConfig.unlockedFields", unlockedManagedEventTypeProps);
    } else {
      form.setValue("metadata", null);
    }
  }, [schedulingTypeWatch]);

  return { form, isManagedEventType };
};

export const useCreateEventType = (
  onSuccessMutation: (eventType: EventType) => void,
  onErrorMutation: (message: string) => void
) => {
  const utils = trpc.useUtils();
  const { t } = useLocale();
  const { form, isManagedEventType } = useCreateEventTypeForm();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const createMutation = trpc.viewer.eventTypesHeavy.create.useMutation({
    onSuccess: async ({ eventType }) => {
      onSuccessMutation(eventType);

      await utils.viewer.eventTypes.getEventTypesFromGroup.fetchInfinite({
        group: { teamId: eventType.teamId, parentId: eventType.parentId },
        searchQuery: debouncedSearchTerm,
        limit: 10,
      });

      form.reset();
    },
    onError: (err) => {
      let error = err.message;
      if (err instanceof HttpError) {
        error = `${err.statusCode}: ${err.message}`;
      }

      if (err.data?.code === "BAD_REQUEST") {
        error = `${err.data.code}: ${t("error_event_type_url_duplicate")}`;
      }

      if (err.data?.code === "UNAUTHORIZED") {
        error = `${err.data.code}: ${t("error_event_type_unauthorized_create")}`;
      }
      onErrorMutation(error);
    },
  });

  return { form, createMutation, isManagedEventType };
};

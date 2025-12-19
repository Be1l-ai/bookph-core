"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import type { Team } from "@bookph/core/prisma/client";
import type { orgSettingsSchema } from "@bookph/core/prisma/zod-utils";
import { trpc } from "@bookph/core/trpc/react";
import { Button } from "@bookph/ui/components/button";
import { Form } from "@bookph/ui/components/form";
import { TextField } from "@bookph/ui/components/form";
import { showToast } from "@bookph/ui/components/toast";

type FormValues = {
  name: Team["name"];
  slug: Team["slug"];
  organizationSettings: z.infer<typeof orgSettingsSchema>;
};

export const OrgForm = ({
  org,
}: {
  org: FormValues & {
    id: Team["id"];
  };
}) => {
  const { t } = useLocale();
  const router = useRouter();
  const utils = trpc.useUtils();
  const mutation = trpc.viewer.organizations.adminUpdate.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.viewer.organizations.adminGetAll.invalidate(),
        utils.viewer.organizations.adminGet.invalidate({
          id: org.id,
        }),
      ]);
      showToast(t("org_has_been_processed"), "success");
      router.replace(`/settings/admin/organizations`);
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  const form = useForm<FormValues>({
    defaultValues: org,
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate({
      id: org.id,
      ...values,
      organizationSettings: {
        ...org.organizationSettings,
        orgAutoAcceptEmail: values.organizationSettings?.orgAutoAcceptEmail,
      },
    });
  };

  return (
    <Form form={form} className="stack-y-4" handleSubmit={onSubmit}>
      <TextField label="Name" placeholder="example" required {...form.register("name")} />
      <TextField label="Slug" placeholder="example" required {...form.register("slug")} />
      <p className="text-default mt-2 text-sm">
        Changing the slug would delete the previous organization domain and DNS and setup new domain and DNS
        for the organization.
      </p>
      <TextField
        label="Domain for which invitations are auto-accepted"
        placeholder="abc.com"
        required
        {...form.register("organizationSettings.orgAutoAcceptEmail")}
      />
      <Button type="submit" color="primary" loading={mutation.isPending}>
        {t("save")}
      </Button>
    </Form>
  );
};

export default OrgForm;

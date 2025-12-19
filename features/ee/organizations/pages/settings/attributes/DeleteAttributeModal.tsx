import type { Dispatch, SetStateAction } from "react";

import { Dialog } from "@bookph/core/features/components/controlled-dialog";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import type { RouterOutputs } from "@bookph/core/trpc/react";
import { trpc } from "@bookph/core/trpc/react";
import { ConfirmationDialogContent } from "@bookph/ui/components/dialog";
import { showToast } from "@bookph/ui/components/toast";
import { revalidateAttributesList } from "@bookph/core/web/app/(use-page-wrapper)/settings/organizations/(org-user-only)/members/actions";

type AttributeItemProps = RouterOutputs["viewer"]["attributes"]["list"][number];

export function DeleteAttributeModal({
  attributeToDelete,
  setAttributeToDelete,
}: {
  attributeToDelete: AttributeItemProps;
  setAttributeToDelete: Dispatch<SetStateAction<AttributeItemProps | undefined>>;
}) {
  const { t } = useLocale();
  const utils = trpc.useUtils();

  const deleteMutation = trpc.viewer.attributes.delete.useMutation({
    onSuccess: () => {
      showToast(t("attribute_deleted_successfully"), "success");
      utils.viewer.attributes.list.invalidate();
      revalidateAttributesList();
    },
    onError: (err) => {
      showToast(err.message, "error");
    },
  });

  return (
    <Dialog open={true} onOpenChange={() => setAttributeToDelete(undefined)}>
      <ConfirmationDialogContent
        variety="danger"
        title={t("remove_attribute")}
        confirmBtnText={t("confirm_remove_attribute")}
        onConfirm={() => {
          deleteMutation.mutate({
            id: attributeToDelete.id,
          });
        }}>
        {t("remove_attribute_confirmation_message", {
          name: attributeToDelete.name,
        })}
      </ConfirmationDialogContent>
    </Dialog>
  );
}

import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import { Dialog } from "@bookph/core/features/components/controlled-dialog";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { Button } from "@bookph/ui/components/button";
import { DialogContent, DialogFooter } from "@bookph/ui/components/dialog";

interface InfoLostWarningDialog {
  isOpenInfoLostDialog: boolean;
  setIsOpenInfoLostDialog: Dispatch<SetStateAction<boolean>>;
  goToRoute: string;
  handleSubmit: () => void;
}

const InfoLostWarningDialog = (props: InfoLostWarningDialog) => {
  const { t } = useLocale();
  const { isOpenInfoLostDialog, setIsOpenInfoLostDialog, goToRoute, handleSubmit } = props;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Dialog open={isOpenInfoLostDialog} onOpenChange={setIsOpenInfoLostDialog}>
      <DialogContent
        title={t("leave_without_saving")}
        description={`${t("leave_without_saving_description")}`}
        Icon="circle-alert">
        <DialogFooter className="mt-6">
          <Button
            onClick={() => {
              setIsOpenInfoLostDialog(false);
            }}
            color="minimal"
            disabled={isSubmitting}>
            {t("go_back")}
          </Button>
          <Button
            onClick={() => {
              setIsSubmitting(true);
              handleSubmit();
              setIsOpenInfoLostDialog(false);
              router.replace(goToRoute);
            }}
            loading={isSubmitting}>
            {t("save_changes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { InfoLostWarningDialog };

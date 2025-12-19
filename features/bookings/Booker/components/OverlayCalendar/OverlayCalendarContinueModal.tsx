import { Dialog } from "@bookph/core/features/components/controlled-dialog";
import { APP_NAME } from "@bookph/core/lib/constants";
import { useLocale } from "@bookph/core/lib/hooks/useLocale";
import { Button } from "@bookph/ui/components/button";
import { DialogContent, DialogFooter } from "@bookph/ui/components/dialog";

interface IOverlayCalendarContinueModalProps {
  open?: boolean;
  onClose?: (state: boolean) => void;
  onContinue: () => void;
}

export function OverlayCalendarContinueModal(props: IOverlayCalendarContinueModalProps) {
  const { t } = useLocale();
  return (
    <>
      <Dialog open={props.open} onOpenChange={props.onClose}>
        <DialogContent
          type="creation"
          title={t("overlay_my_calendar")}
          description={t("overlay_my_calendar_toc")}>
          <div className="flex flex-col gap-2">
            <Button
              data-testid="overlay-calendar-continue-button"
              onClick={() => {
                props.onContinue();
              }}
              className="gap w-full items-center justify-center font-semibold"
              StartIcon="calendar-search">
              {t("continue_with", { appName: APP_NAME })}
            </Button>
          </div>
          <DialogFooter>
            {/* Agh modal hacks */}
            <></>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

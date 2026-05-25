import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import type { HotelFacility } from "../../types/facility";

interface Props {
  open: boolean;
  facility: HotelFacility | null;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteFacilityDialog({
  open,
  facility,
  onClose,
  onConfirm,
  isDeleting,
}: Props) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t("facilities.deleteDialog.title", "Delete facility")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("facilities.deleteDialog.confirm", "Are you sure you want to delete {{name}}? This action cannot be undone.", { name: facility?.name ?? "this facility" })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          {t("facilities.deleteDialog.cancel", "Cancel")}
        </Button>
        <Button color="error" variant="contained" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? t("facilities.deleteDialog.deleting", "Deleting...") : t("facilities.deleteDialog.delete", "Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

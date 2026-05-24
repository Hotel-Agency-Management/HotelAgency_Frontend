import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import type { RoomAmenity } from "../types/roomAmenity";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  amenity: RoomAmenity | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteRoomAmenityDialog({
  open,
  amenity,
  isDeleting,
  onClose,
  onConfirm,
}: Props) {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t('roomAmenities.deleteDialog.title', { defaultValue: 'Delete Room Amenity' })}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('roomAmenities.deleteDialog.confirm', {
            name: amenity?.name ?? t('roomAmenities.deleteDialog.thisAmenity', { defaultValue: 'this amenity' }),
            defaultValue: 'Are you sure you want to delete {{name}}? Rooms that already reference this amenity may need to be updated later.',
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          {t('common.cancel', { defaultValue: 'Cancel' })}
        </Button>
        <Button color="error" variant="contained" onClick={onConfirm} disabled={isDeleting}>
          {t('roomAmenities.delete', { defaultValue: 'Delete' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

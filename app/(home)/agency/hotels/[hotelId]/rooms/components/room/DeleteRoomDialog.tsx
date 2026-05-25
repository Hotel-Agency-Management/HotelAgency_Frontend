import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface DeleteRoomDialogProps {
  open: boolean;
  roomNumber?: string;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteRoomDialog({
  open,
  roomNumber,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteRoomDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t("hotelRooms.deleteDialog.title", "Delete room")}</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          {t("hotelRooms.deleteDialog.message", {
            defaultValue: "Are you sure you want to delete {{roomLabel}}? This action cannot be undone.",
            roomLabel: roomNumber
              ? t("hotelRooms.deleteDialog.roomLabel", {
                  defaultValue: "room {{number}}",
                  number: roomNumber,
                })
              : t("hotelRooms.deleteDialog.thisRoom", "this room"),
          })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          {t("hotelRooms.dialog.cancel", "Cancel")}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={isDeleting}>
          {t("hotelRooms.profile.delete", "Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

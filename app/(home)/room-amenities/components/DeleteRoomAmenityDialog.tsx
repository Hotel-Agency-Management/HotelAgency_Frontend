import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import type { RoomAmenity } from "../types/roomAmenity";

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
  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete room amenity</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {amenity?.name ?? "this amenity"}? Rooms that
          already reference this amenity may need to be updated later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="error" variant="contained" onClick={onConfirm} disabled={isDeleting}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

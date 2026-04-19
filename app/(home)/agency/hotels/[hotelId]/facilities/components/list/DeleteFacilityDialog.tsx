import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete facility</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {facility?.name ?? "this facility"}? This action
          cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="error" variant="contained" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

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
  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete room</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          Are you sure you want to delete {roomNumber ? `room ${roomNumber}` : "this room"}?
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={isDeleting}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

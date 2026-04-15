import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { Hotel } from "../types/hotel";

interface DeleteHotelDialogProps {
  hotel: Hotel | null;
  loading: boolean;
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteHotelDialog({
  hotel,
  loading,
  open,
  onClose,
  onConfirm,
}: DeleteHotelDialogProps) {
  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete hotel</DialogTitle>

      <DialogContent>
        <Typography variant="body2">
          Are you sure you want to delete{" "}
          <Typography component="span" variant="body2" fontWeight={600} color="text.primary">
            {hotel?.basicInfo.name}
          </Typography>
          ? This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={14} color="inherit" /> : undefined}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from "@mui/material";
import type { HousekeepingTask } from "../types/task";

interface DeleteTaskDialogProps {
  open: boolean;
  task: HousekeepingTask | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteTaskDialog({
  open,
  task,
  onClose,
  onConfirm
}: DeleteTaskDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent dividers>
        <Stack gap={1}>
          <Typography variant="body2">
            This action will permanently remove the housekeeping task from the board.
          </Typography>
          {task && (
            <Typography variant="body2" fontWeight={600}>
              Room {task.roomNumber} • {task.type}
            </Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

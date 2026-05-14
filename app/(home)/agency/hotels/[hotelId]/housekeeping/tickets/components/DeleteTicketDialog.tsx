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
import type { HousekeepingTicket } from "../types/ticket";

interface DeleteTicketDialogProps {
  open: boolean;
  ticket: HousekeepingTicket | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteTicketDialog({
  open,
  ticket,
  onClose,
  onConfirm
}: DeleteTicketDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Ticket</DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          <Typography variant="body2">
            This action will permanently remove the housekeeping ticket from the board.
          </Typography>
          {ticket && (
            <Typography variant="body2" fontWeight={600}>
              {ticket.ticketKey} • {ticket.title}
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

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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t("housekeeping.tickets.deleteDialog.title", "Delete Ticket")}</DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          <Typography variant="body2">
            {t("housekeeping.tickets.deleteDialog.body", "This action will permanently remove the housekeeping ticket from the board.")}
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
          {t("common.cancel", "Cancel")}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {t("housekeeping.tickets.deleteDialog.delete", "Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

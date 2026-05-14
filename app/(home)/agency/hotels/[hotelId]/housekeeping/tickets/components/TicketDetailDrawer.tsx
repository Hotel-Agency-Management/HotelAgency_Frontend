"use client";

import { useCallback } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { AlertTriangle, Pencil, Trash2, X } from "lucide-react";
import Can from "@/components/ability/Can";
import { HOUSEKEEPING_LOCATION_TYPE } from "../constants/ticket";
import { LOCATION_TYPE_LABELS } from "../constants/ticketLabel";
import { HousekeepingTicket } from "../types/ticket";
import { DetailItem } from "./DetailItem";
import {  ColoredChip, TicketCardAssigneeAvatar } from "../styles/StyledComponents";
import { useTicketDisplay } from "../hooks/useTicketDisplay";


interface TicketDetailDrawerProps {
  ticket: HousekeepingTicket | null;
  getTicketLocationLabel: (ticket: HousekeepingTicket) => string;
  onClose: () => void;
  onEdit: (ticket: HousekeepingTicket) => void;
  onDelete: (ticket: HousekeepingTicket) => void;
  onReportDamage?: (ticket: HousekeepingTicket) => void;
}

export function TicketDetailDrawer({
  ticket,
  getTicketLocationLabel,
  onClose,
  onEdit,
  onDelete,
  onReportDamage,
}: TicketDetailDrawerProps) {
  const theme = useTheme();

  const {
    priorityColor,
    ticketTypeColor,
    statusColor,
    priorityLabel,
    ticketTypeLabel,
    statusLabel,
    locationLabel,
    initials,
  } = useTicketDisplay(ticket, getTicketLocationLabel);

  const handleEdit = useCallback(() => {
    if (!ticket) return;
    onClose();
    onEdit(ticket);
  }, [ticket, onClose, onEdit]);

  const handleDelete = useCallback(() => {
    if (!ticket) return;
    onClose();
    onDelete(ticket);
  }, [ticket, onClose, onDelete]);

  const handleReportDamage = useCallback(() => {
    if (!ticket) return;
    onClose();
    onReportDamage?.(ticket);
  }, [ticket, onClose, onReportDamage]);

  return (
    <Drawer anchor="right" open={Boolean(ticket)} onClose={onClose} >
      {ticket && (
        <Stack height="100%" gap={0} padding={3} >
          <Stack gap={1}>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={2}>
              <Typography variant="h6" fontWeight={700}>
                {ticket.ticketKey}
              </Typography>
              <Tooltip title="Close">
                <IconButton size="small" onClick={onClose}>
                  <X size={18} />
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
              <Typography variant="body2">
                {locationLabel}
              </Typography>
              <ColoredChip
                size="small"
                label={statusLabel}
                chipColor={statusColor}
                opacity={0.12}
                alignSelf="flex-start"
              />
            </Stack>
          </Stack>

          <Stack flex={1} minHeight={0}>

            <Stack flex={1} overflow="auto" >
              <Stack gap={3}>
                <Typography variant="caption" fontWeight={700} textTransform="uppercase">
                  Ticket Details
                </Typography>

                <Stack gap={1.75}>
                  <DetailItem label="Title">
                    <Typography variant="subtitle2" fontWeight={700}>
                      {ticket.title}
                    </Typography>
                  </DetailItem>
                  <DetailItem label="Description">
                    <Typography variant="body2" fontWeight={500}>
                      {ticket.description || "No description"}
                    </Typography>
                  </DetailItem>
                  <Divider />
                  <DetailItem label="Ticket type" inline>
                    <ColoredChip size="small" label={ticketTypeLabel} chipColor={ticketTypeColor} />
                  </DetailItem>
                  <DetailItem label="Location" inline>
                    <ColoredChip size="small" label={locationLabel} chipColor={theme.palette.primary.main} opacity={0.08} />
                  </DetailItem>
                  <DetailItem label="Location type" inline>
                    <Typography variant="body2" fontWeight={600}>
                      {LOCATION_TYPE_LABELS[ticket.locationType]}
                    </Typography>
                  </DetailItem>
                  <DetailItem label="Priority" inline>
                    <ColoredChip size="small" label={priorityLabel} chipColor={priorityColor} />
                  </DetailItem>
                  <DetailItem label="Assigned to" inline>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <TicketCardAssigneeAvatar>{initials}</TicketCardAssigneeAvatar>
                      <Typography variant="body2" fontWeight={600}>
                        {ticket.assignedTo}
                      </Typography>
                    </Stack>
                  </DetailItem>
                  {ticket.reservationId && (
                    <DetailItem label="Reservation" inline>
                      <Typography variant="body2" fontWeight={600}>
                        #{ticket.reservationId}
                      </Typography>
                    </DetailItem>
                  )}
                </Stack>
              </Stack>
            </Stack>

            <Divider />

            <Stack gap={2}>
              <Typography variant="caption" fontWeight={700} textTransform="uppercase">
                Actions
              </Typography>
              <Stack gap={1.25}>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Button variant="outlined" size="small" startIcon={<Pencil size={14} />} onClick={handleEdit}>
                    Edit ticket
                  </Button>
                  <Button variant="outlined" size="small" color="error" startIcon={<Trash2 size={14} />} onClick={handleDelete}>
                    Delete ticket
                  </Button>
                </Stack>
                {ticket.locationType === HOUSEKEEPING_LOCATION_TYPE.ROOM && onReportDamage && (
                  <Can do="create" this="DamageReports">
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      startIcon={<AlertTriangle size={14} />}
                      onClick={handleReportDamage}
                      fullWidth
                    >
                      Report damage
                    </Button>
                  </Can>
                )}
              </Stack>
            </Stack>

          </Stack>
        </Stack>
      )}
    </Drawer>
  );
}

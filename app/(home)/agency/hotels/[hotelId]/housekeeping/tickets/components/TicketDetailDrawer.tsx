"use client";

import { useCallback } from "react";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { X } from "lucide-react";
import { getLocationTypeLabels } from "../constants/ticketLabel";
import { ColoredChip, TicketCardAssigneeAvatar } from "../styles/StyledComponents";
import type { AddCommentValues, TicketComment } from "../types/comment";
import type { HousekeepingTicket } from "../types/ticket";
import { useTicketDisplay } from "../hooks/useTicketDisplay";
import { DetailItem } from "./DetailItem";
import { TicketActionsMenu } from "./TicketActionsMenu";
import { TicketCommentSection } from "./TicketCommentSection";
import { TicketWatchListButton } from "./TicketWatchlistButton";

interface TicketDetailDrawerProps {
  ticket: HousekeepingTicket | null;
  getTicketLocationLabel: (ticket: HousekeepingTicket) => string;
  comments: TicketComment[];
  onClose: () => void;
  onEdit: (ticket: HousekeepingTicket) => void;
  onDelete: (ticket: HousekeepingTicket) => void;
  onReportDamage?: (ticket: HousekeepingTicket) => void;
  onAddComment: (values: AddCommentValues) => void;
  onEditComment: (commentId: string, newBody: string) => void;
  onDeleteComment: (commentId: string) => void;
  canAddComment?: boolean;
  canEditComment?: boolean;
  canDeleteComment?: boolean;
}

export function TicketDetailDrawer({
  ticket,
  getTicketLocationLabel,
  comments,
  onClose,
  onEdit,
  onDelete,
  onReportDamage,
  onAddComment,
  onEditComment,
  onDeleteComment,
  canAddComment,
  canEditComment,
  canDeleteComment,
}: TicketDetailDrawerProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const locationTypeLabels = getLocationTypeLabels(t);

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
    <Drawer anchor="right" open={Boolean(ticket)} onClose={onClose}>
      {ticket && (
        <Stack height="100%" gap={0} padding={3}>
          <Stack gap={1}>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
              <Typography variant="h6" fontWeight={700} flex={1} minWidth={0}>
                {ticket.ticketKey}
              </Typography>
              <Stack direction="row" alignItems="center" gap={0.5} flexShrink={0}>
                <TicketWatchListButton ticketId={ticket.id} />
                <TicketActionsMenu
                  ticket={ticket}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onReportDamage={onReportDamage ? handleReportDamage : undefined}
                />
                <Tooltip title={t("housekeeping.tickets.detail.close", "Close")}>
                  <IconButton size="small" onClick={onClose}>
                    <X size={18} />
                  </IconButton>
                </Tooltip>
              </Stack>
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

          <Stack
            flex={1}
            minHeight={0}
            overflow="auto"
            gap={0}
            dir={theme.direction === 'rtl' ? 'ltr' : undefined}
          >
            <Stack dir={theme.direction === 'rtl' ? 'rtl' : undefined}>
            <Stack gap={3} pb={2}>
              <Typography variant="caption" fontWeight={700} textTransform="uppercase">
                {t("housekeeping.tickets.detail.ticketDetails", "Ticket Details")}
              </Typography>

              <Stack gap={1.75}>
                <DetailItem label={t("housekeeping.tickets.detail.title", "Title")}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {ticket.title}
                  </Typography>
                </DetailItem>
                <DetailItem label={t("housekeeping.tickets.detail.description", "Description")}>
                  <Typography variant="body2" fontWeight={500}>
                    {ticket.description || t("housekeeping.tickets.detail.noDescription", "No description")}
                  </Typography>
                </DetailItem>
                <Divider />
                <DetailItem label={t("housekeeping.tickets.detail.ticketType", "Ticket type")} inline>
                  <ColoredChip size="small" label={ticketTypeLabel} chipColor={ticketTypeColor} />
                </DetailItem>
                <DetailItem label={t("housekeeping.tickets.detail.location", "Location")} inline>
                  <ColoredChip size="small" label={locationLabel} chipColor={theme.palette.primary.main} opacity={0.08} />
                </DetailItem>
                <DetailItem label={t("housekeeping.tickets.detail.locationType", "Location type")} inline>
                  <Typography variant="body2" fontWeight={600}>
                    {locationTypeLabels[ticket.locationType]}
                  </Typography>
                </DetailItem>
                <DetailItem label={t("housekeeping.tickets.detail.priority", "Priority")} inline>
                  <ColoredChip size="small" label={priorityLabel} chipColor={priorityColor} />
                </DetailItem>
                {ticket.deadline && (
                  <DetailItem label={t("housekeeping.tickets.detail.deadline", "Deadline")} inline>
                    <Typography variant="body2" fontWeight={600}>
                      {dayjs(ticket.deadline).format("MMM D, YYYY · h:mm A")}
                    </Typography>
                  </DetailItem>
                )}
                <DetailItem label={t("housekeeping.tickets.detail.assignedTo", "Assigned to")} inline>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <TicketCardAssigneeAvatar>{initials}</TicketCardAssigneeAvatar>
                    <Typography variant="body2" fontWeight={600}>
                      {ticket.assignedTo}
                    </Typography>
                  </Stack>
                </DetailItem>
                {ticket.reservationId && (
                  <DetailItem label={t("housekeeping.tickets.detail.reservation", "Reservation")} inline>
                    <Typography variant="body2" fontWeight={600}>
                      #{ticket.reservationId}
                    </Typography>
                  </DetailItem>
                )}
              </Stack>
            </Stack>

            <Divider />

            <TicketCommentSection
              ticketId={ticket.id}
              comments={comments}
              onAddComment={onAddComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
              canAddComment={canAddComment}
              canEditComment={canEditComment}
              canDeleteComment={canDeleteComment}
            />
            </Stack>
          </Stack>
        </Stack>
      )}
    </Drawer>
  );
}

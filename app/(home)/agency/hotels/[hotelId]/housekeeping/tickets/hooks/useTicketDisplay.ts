import { useTheme } from "@mui/material/styles";
import { PRIORITY_COLOR_KEY, STATUS_COLOR_KEY, TICKET_TYPE_COLOR_KEY } from "../constants/chipColor";
import { PRIORITY_LABELS, STATUS_LABELS } from "../constants/ticketChip";
import { TICKET_TYPE_LABELS } from "../constants/ticketLabel";
import { getInitials } from "../../utils/ticket";
import { HousekeepingTicket } from "../types/ticket";

export function useTicketDisplay(
  ticket: HousekeepingTicket | null,
  getTicketLocationLabel?: (ticket: HousekeepingTicket) => string
) {
  const theme = useTheme();

  const priorityColor = theme.palette[ticket ? PRIORITY_COLOR_KEY[ticket.priority] : "secondary"].main;
  const ticketTypeColor = theme.palette[ticket ? TICKET_TYPE_COLOR_KEY[ticket.ticketType] : "secondary"].main;
  const statusColor = theme.palette[ticket ? STATUS_COLOR_KEY[ticket.status] : "secondary"].main;
  const priorityLabel = ticket ? PRIORITY_LABELS[ticket.priority] : "";
  const ticketTypeLabel = ticket ? TICKET_TYPE_LABELS[ticket.ticketType] : "";
  const statusLabel = ticket ? STATUS_LABELS[ticket.status] : "";
  const locationLabel = ticket && getTicketLocationLabel ? getTicketLocationLabel(ticket) : "";
  const initials = ticket ? getInitials(ticket.assignedTo) : "";

  return {
    priorityColor,
    ticketTypeColor,
    statusColor,
    priorityLabel,
    ticketTypeLabel,
    statusLabel,
    locationLabel,
    initials,
  };
}

import {
  HOUSEKEEPING_TICKET_PRIORITY,
  HOUSEKEEPING_TICKET_STATUS,
} from "./ticket";
import type {
  HousekeepingTicketPriority,
  HousekeepingTicketStatus
} from "../types/ticket";

export const PRIORITY_LABELS: Record<HousekeepingTicketPriority, string> = {
  [HOUSEKEEPING_TICKET_PRIORITY.LOW]: "Low",
  [HOUSEKEEPING_TICKET_PRIORITY.MEDIUM]: "Medium",
  [HOUSEKEEPING_TICKET_PRIORITY.HIGH]: "High"
};

export const STATUS_LABELS: Record<HousekeepingTicketStatus, string> = {
  [HOUSEKEEPING_TICKET_STATUS.TO_DO]: "To Do",
  [HOUSEKEEPING_TICKET_STATUS.IN_PROGRESS]: "In Progress",
  [HOUSEKEEPING_TICKET_STATUS.REVIEW]: "Review",
  [HOUSEKEEPING_TICKET_STATUS.DONE]: "Done",
};

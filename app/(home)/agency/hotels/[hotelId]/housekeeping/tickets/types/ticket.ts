import { HOUSEKEEPING_TICKET_TYPE, HOUSEKEEPING_LOCATION_TYPE, HOUSEKEEPING_TICKET_STATUS, HOUSEKEEPING_TICKET_PRIORITY, HOUSEKEEPING_FILTER_ALL } from "../constants/ticket";
import type { TicketComment, AddCommentValues } from "./comment";

export type HousekeepingTicketType =
  (typeof HOUSEKEEPING_TICKET_TYPE)[keyof typeof HOUSEKEEPING_TICKET_TYPE];
export type HousekeepingLocationType =
  (typeof HOUSEKEEPING_LOCATION_TYPE)[keyof typeof HOUSEKEEPING_LOCATION_TYPE];
export type HousekeepingTicketStatus =
  (typeof HOUSEKEEPING_TICKET_STATUS)[keyof typeof HOUSEKEEPING_TICKET_STATUS];
export type HousekeepingTicketPriority =
  (typeof HOUSEKEEPING_TICKET_PRIORITY)[keyof typeof HOUSEKEEPING_TICKET_PRIORITY];
export type HousekeepingFilterAll = typeof HOUSEKEEPING_FILTER_ALL;

export interface HousekeepingTicket {
  id: string;
  ticketKey: string;
  ticketType: HousekeepingTicketType;
  locationType: HousekeepingLocationType;
  title: string;
  description: string;
  roomId?: string;
  facilityId?: string;
  /** Pre-formatted location label from board/list API responses. */
  locationLabel?: string;
  status: HousekeepingTicketStatus;
  assignedTo: string;
  assignedToId?: number;
  priority: HousekeepingTicketPriority;
  reservationId?: string;
  deadline?: string;
}

export interface HousekeepingTicketValues {
  ticketType: HousekeepingTicketType;
  locationType: HousekeepingLocationType;
  title: string;
  description: string;
  roomId?: string;
  facilityId?: string;
  assignedTo: string;
  assignedToId?: number;
  priority: HousekeepingTicketPriority;
  deadline: string;
}

export interface HousekeepingTicketFilters {
  status: HousekeepingTicketStatus | HousekeepingFilterAll;
  assignedTo: string | HousekeepingFilterAll;
}

export interface TicketWatcher {
  id: string;
  name: string;
  initials: string;
}

export type { TicketComment, AddCommentValues };

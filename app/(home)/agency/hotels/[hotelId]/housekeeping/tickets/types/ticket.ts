import { HOUSEKEEPING_TICKET_TYPE, HOUSEKEEPING_LOCATION_TYPE, HOUSEKEEPING_TICKET_STATUS, HOUSEKEEPING_TICKET_PRIORITY, HOUSEKEEPING_FILTER_ALL } from "../constants/ticket";

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
  status: HousekeepingTicketStatus;
  assignedTo: string;
  priority: HousekeepingTicketPriority;
  reservationId?: string;
}

export interface HousekeepingTicketValues {
  ticketType: HousekeepingTicketType;
  locationType: HousekeepingLocationType;
  title: string;
  description: string;
  roomId?: string;
  facilityId?: string;
  assignedTo: string;
  priority: HousekeepingTicketPriority;
}

export interface HousekeepingTicketFilters {
  status: HousekeepingTicketStatus | HousekeepingFilterAll;
  assignedTo: string | HousekeepingFilterAll;
}

export interface HousekeepingTicketStore {
  tickets: HousekeepingTicket[];
  createTicket: (values: HousekeepingTicketValues) => void;
  moveTicket: (
    ticketId: string,
    newStatus: HousekeepingTicketStatus,
    targetTicketId?: string
  ) => void;
  updateTicket: (ticketId: string, values: HousekeepingTicketValues) => void;
  deleteTicket: (ticketId: string) => void;
}

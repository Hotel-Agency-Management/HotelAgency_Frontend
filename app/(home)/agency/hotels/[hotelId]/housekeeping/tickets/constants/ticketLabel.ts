import type {
  HousekeepingTicketFilters,
  HousekeepingLocationType,
  HousekeepingTicketType,
} from "../types/ticket";

import {
  HOUSEKEEPING_FILTER_ALL,
  HOUSEKEEPING_LOCATION_TYPE,
  HOUSEKEEPING_TICKET_TYPE,
} from "./ticket";

export const TICKET_TYPE_LABELS: Record<HousekeepingTicketType, string> = {
  [HOUSEKEEPING_TICKET_TYPE.TASK]: "Task",
  [HOUSEKEEPING_TICKET_TYPE.ISSUE]: "Issue",
  [HOUSEKEEPING_TICKET_TYPE.INSPECTION]: "Inspection",
  [HOUSEKEEPING_TICKET_TYPE.MAINTENANCE_REQUEST]: "Maintenance request",
};

export const LOCATION_TYPE_LABELS: Record<HousekeepingLocationType, string> = {
  [HOUSEKEEPING_LOCATION_TYPE.ROOM]: "Room",
  [HOUSEKEEPING_LOCATION_TYPE.FACILITY]: "Facility",
};

export const INITIAL_FILTERS: HousekeepingTicketFilters = {
  status: HOUSEKEEPING_FILTER_ALL,
  assignedTo: HOUSEKEEPING_FILTER_ALL,
};

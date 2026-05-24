import type { TFunction } from "i18next";
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

export function getTicketTypeLabels(t: TFunction): Record<HousekeepingTicketType, string> {
  return {
    [HOUSEKEEPING_TICKET_TYPE.TASK]: t("housekeeping.tickets.types.Task", "Task"),
    [HOUSEKEEPING_TICKET_TYPE.ISSUE]: t("housekeeping.tickets.types.Issue", "Issue"),
    [HOUSEKEEPING_TICKET_TYPE.INSPECTION]: t("housekeeping.tickets.types.Inspection", "Inspection"),
    [HOUSEKEEPING_TICKET_TYPE.MAINTENANCE_REQUEST]: t("housekeeping.tickets.types.MaintenanceRequest", "Maintenance request"),
  };
}

export function getLocationTypeLabels(t: TFunction): Record<HousekeepingLocationType, string> {
  return {
    [HOUSEKEEPING_LOCATION_TYPE.ROOM]: t("housekeeping.tickets.locationTypes.Room", "Room"),
    [HOUSEKEEPING_LOCATION_TYPE.FACILITY]: t("housekeeping.tickets.locationTypes.Facility", "Facility"),
  };
}

/** @deprecated Use getTicketTypeLabels(t) for translated labels. */
export const TICKET_TYPE_LABELS: Record<HousekeepingTicketType, string> = {
  [HOUSEKEEPING_TICKET_TYPE.TASK]: "Task",
  [HOUSEKEEPING_TICKET_TYPE.ISSUE]: "Issue",
  [HOUSEKEEPING_TICKET_TYPE.INSPECTION]: "Inspection",
  [HOUSEKEEPING_TICKET_TYPE.MAINTENANCE_REQUEST]: "Maintenance request",
};

/** @deprecated Use getLocationTypeLabels(t) for translated labels. */
export const LOCATION_TYPE_LABELS: Record<HousekeepingLocationType, string> = {
  [HOUSEKEEPING_LOCATION_TYPE.ROOM]: "Room",
  [HOUSEKEEPING_LOCATION_TYPE.FACILITY]: "Facility",
};

export const INITIAL_FILTERS: HousekeepingTicketFilters = {
  status: HOUSEKEEPING_FILTER_ALL,
  assignedTo: HOUSEKEEPING_FILTER_ALL,
};

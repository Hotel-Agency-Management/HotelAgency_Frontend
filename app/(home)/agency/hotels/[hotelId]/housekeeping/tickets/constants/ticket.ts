export const HOUSEKEEPING_TICKET_TYPE = {
  TASK: "Task",
  ISSUE: "Issue",
  INSPECTION: "Inspection",
  MAINTENANCE_REQUEST: "MaintenanceRequest",
} as const;

export const HOUSEKEEPING_LOCATION_TYPE = {
  ROOM: "Room",
  FACILITY: "Facility",
} as const;

export const HOUSEKEEPING_TICKET_STATUS = {
  TO_DO: "TO_DO",
  IN_PROGRESS: "IN_PROGRESS",
  REVIEW: "REVIEW",
  DONE: "DONE",
} as const;

export const HOUSEKEEPING_TICKET_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export const HOUSEKEEPING_FILTER_ALL = "ALL";

export const TICKET_KEY_PREFIX = "HK";

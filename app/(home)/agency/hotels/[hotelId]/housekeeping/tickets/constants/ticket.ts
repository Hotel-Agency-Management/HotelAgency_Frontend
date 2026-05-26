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
  TO_DO: "Todo",
  IN_PROGRESS: "InProgress",
  REVIEW: "Review",
  DONE: "Done",
} as const;

export const HOUSEKEEPING_TICKET_PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
} as const;

export const HOUSEKEEPING_FILTER_ALL = "ALL";

export const TICKET_KEY_PREFIX = "HK";

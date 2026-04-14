import {
  HOUSEKEEPING_TASK_PRIORITY,
  HOUSEKEEPING_TASK_STATUS,
  HousekeepingTaskPriority,
  HousekeepingTaskStatus
} from "../types/task";

export const PRIORITY_LABELS: Record<HousekeepingTaskPriority, string> = {
  [HOUSEKEEPING_TASK_PRIORITY.LOW]: "Low",
  [HOUSEKEEPING_TASK_PRIORITY.MEDIUM]: "Medium",
  [HOUSEKEEPING_TASK_PRIORITY.HIGH]: "High"
};

export const STATUS_LABELS: Record<HousekeepingTaskStatus, string> = {
  [HOUSEKEEPING_TASK_STATUS.PENDING]: "Pending",
  [HOUSEKEEPING_TASK_STATUS.IN_PROGRESS]: "In Progress",
  [HOUSEKEEPING_TASK_STATUS.COMPLETED]: "Completed"
};

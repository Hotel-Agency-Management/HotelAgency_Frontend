export const HOUSEKEEPING_TASK_TYPE = {
  CHECKOUT: "CHECKOUT",
  STAYOVER: "STAYOVER",
  INSPECTION: "INSPECTION",
} as const;

export const HOUSEKEEPING_TASK_STATUS = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;

export const HOUSEKEEPING_TASK_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export const HOUSEKEEPING_FILTER_ALL = "ALL";

export type HousekeepingTaskType =
  (typeof HOUSEKEEPING_TASK_TYPE)[keyof typeof HOUSEKEEPING_TASK_TYPE];
export type HousekeepingTaskStatus =
  (typeof HOUSEKEEPING_TASK_STATUS)[keyof typeof HOUSEKEEPING_TASK_STATUS];
export type HousekeepingTaskPriority =
  (typeof HOUSEKEEPING_TASK_PRIORITY)[keyof typeof HOUSEKEEPING_TASK_PRIORITY];
export type HousekeepingFilterAll = typeof HOUSEKEEPING_FILTER_ALL;

export interface HousekeepingTask {
  id: string;
  roomNumber: string;
  type: HousekeepingTaskType;
  status: HousekeepingTaskStatus;
  assignedTo: string;
  priority: HousekeepingTaskPriority;
  floor: number;
}

export interface HousekeepingTaskFilters {
  status: HousekeepingTaskStatus | HousekeepingFilterAll;
  assignedTo: string | HousekeepingFilterAll;
  floor: number | HousekeepingFilterAll;
}

import { HousekeepingTaskPriority, HousekeepingTaskStatus } from "../types/task";

export const PRIORITY_LABELS: Record<HousekeepingTaskPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High"
};

export const STATUS_LABELS: Record<HousekeepingTaskStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed"
};


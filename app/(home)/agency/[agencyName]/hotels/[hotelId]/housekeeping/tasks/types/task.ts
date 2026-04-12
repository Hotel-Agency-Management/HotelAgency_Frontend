export type HousekeepingTaskType = "CHECKOUT" | "STAYOVER" | "INSPECTION";
export type HousekeepingTaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type HousekeepingTaskPriority = "LOW" | "MEDIUM" | "HIGH";

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
  status: HousekeepingTaskStatus | "ALL";
  assignedTo: string | "ALL";
  floor: number | "ALL";
}

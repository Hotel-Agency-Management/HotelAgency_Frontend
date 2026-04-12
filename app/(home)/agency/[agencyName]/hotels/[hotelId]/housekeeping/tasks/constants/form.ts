import { HousekeepingTaskType, HousekeepingTaskPriority } from "../types/task";

export const INITIAL_FORM = {
  roomNumber: "",
  type: "CHECKOUT" as HousekeepingTaskType,
  assignedTo: "",
  priority: "MEDIUM" as HousekeepingTaskPriority,
  floor: 1
};

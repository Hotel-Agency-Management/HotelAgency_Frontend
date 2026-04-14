import {
  HOUSEKEEPING_TASK_PRIORITY,
  HOUSEKEEPING_TASK_TYPE,
  HousekeepingTaskPriority,
  HousekeepingTaskType
} from "../types/task";

export const INITIAL_FORM = {
  roomNumber: "",
  type: HOUSEKEEPING_TASK_TYPE.CHECKOUT as HousekeepingTaskType,
  assignedTo: "",
  priority: HOUSEKEEPING_TASK_PRIORITY.MEDIUM as HousekeepingTaskPriority,
  floor: 1
};

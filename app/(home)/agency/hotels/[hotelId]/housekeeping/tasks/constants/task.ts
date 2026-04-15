import type {
  HousekeepingTaskFilters,
  HousekeepingTaskType
} from "../types/task";
import {
  HOUSEKEEPING_FILTER_ALL,
  HOUSEKEEPING_TASK_TYPE
} from "../types/task";

export const TASK_TYPE_LABELS: Record<HousekeepingTaskType, string> = {
  [HOUSEKEEPING_TASK_TYPE.CHECKOUT]: "Checkout",
  [HOUSEKEEPING_TASK_TYPE.STAYOVER]: "Stayover",
  [HOUSEKEEPING_TASK_TYPE.INSPECTION]: "Inspection"
};

export const INITIAL_FILTERS: HousekeepingTaskFilters = {
  status: HOUSEKEEPING_FILTER_ALL,
  assignedTo: HOUSEKEEPING_FILTER_ALL,
  floor: HOUSEKEEPING_FILTER_ALL
};

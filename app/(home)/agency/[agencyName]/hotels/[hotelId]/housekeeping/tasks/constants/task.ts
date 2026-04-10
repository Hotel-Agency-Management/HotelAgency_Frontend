import type {
  HousekeepingTaskFilters,
  HousekeepingTaskType
} from "../types/task";

export const TASK_TYPE_LABELS: Record<HousekeepingTaskType, string> = {
  CHECKOUT: "Checkout",
  STAYOVER: "Stayover",
  INSPECTION: "Inspection"
};

export const INITIAL_FILTERS: HousekeepingTaskFilters = {
  status: "ALL",
  assignedTo: "ALL",
  floor: "ALL"
};

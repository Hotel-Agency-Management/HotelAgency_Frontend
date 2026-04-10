import type { GridColDef } from "@mui/x-data-grid";
import type { HousekeepingTask } from "../../../types/task";
import { TaskPriorityChip } from "../../TaskPriorityChip";
import type { HousekeepingColumnStrategy } from "../types";

export const priorityColumn: GridColDef<HousekeepingTask> = {
  field: "priority",
  headerName: "Priority",
  minWidth: 120,
  flex: 0.6,
  renderCell: ({ value }) => <TaskPriorityChip priority={value} />
};

export const priorityColumnStrategy: HousekeepingColumnStrategy = {
  key: "priority",
  build: () => priorityColumn
};

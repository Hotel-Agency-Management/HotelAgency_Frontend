import type { GridColDef } from "@mui/x-data-grid";
import { PriorityCell } from "../../PriorityCell";
import type { HousekeepingTask, HousekeepingTaskPriority } from "../../../types/task";

export const priorityColumn: GridColDef<HousekeepingTask> = {
  field: "priority",
  headerName: "Priority",
  minWidth: 120,
  flex: 0.6,
  renderCell: ({ value }) => <PriorityCell value={value as HousekeepingTaskPriority} />
};

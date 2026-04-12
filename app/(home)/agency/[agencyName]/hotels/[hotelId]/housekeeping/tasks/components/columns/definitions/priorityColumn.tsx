import type { GridColDef } from "@mui/x-data-grid";
import type { HousekeepingTask, HousekeepingTaskPriority } from "../../../types/task";
import { PRIORITY_COLOR_KEY } from "../../../constants/chipColor";
import { PRIORITY_LABELS } from "../../../constants/taskChip";
import { StatusChip } from "../../StatusChip";

export const priorityColumn: GridColDef<HousekeepingTask> = {
  field: "priority",
  headerName: "Priority",
  minWidth: 120,
  flex: 0.6,
  renderCell: ({ value }) => (
    <StatusChip
      label={PRIORITY_LABELS[value as HousekeepingTaskPriority]}
      colorKey={PRIORITY_COLOR_KEY[value as HousekeepingTaskPriority]}
    />
  )
};

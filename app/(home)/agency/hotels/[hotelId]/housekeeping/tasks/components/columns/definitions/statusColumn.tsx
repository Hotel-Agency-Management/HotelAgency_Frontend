import type { GridColDef } from "@mui/x-data-grid";
import type { HousekeepingTask, HousekeepingTaskStatus } from "../../../types/task";
import { STATUS_COLOR_KEY } from "../../../constants/chipColor";
import { STATUS_LABELS } from "../../../constants/taskChip";
import { StatusChip } from "../../StatusChip";

export const statusColumn: GridColDef<HousekeepingTask> = {
  field: "status",
  headerName: "Status",
  minWidth: 150,
  flex: 0.7,
  renderCell: ({ value }) => (
    <StatusChip
      label={STATUS_LABELS[value as HousekeepingTaskStatus]}
      colorKey={STATUS_COLOR_KEY[value as HousekeepingTaskStatus]}
    />
  )
};

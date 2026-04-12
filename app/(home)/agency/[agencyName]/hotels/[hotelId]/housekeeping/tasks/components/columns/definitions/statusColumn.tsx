import type { GridColDef } from "@mui/x-data-grid";
import type { HousekeepingTask, HousekeepingTaskStatus } from "../../../types/task";
import { StatusCell } from "../../StatusCell";

export const statusColumn: GridColDef<HousekeepingTask> = {
  field: "status",
  headerName: "Status",
  minWidth: 150,
  flex: 0.7,
  renderCell: ({ value }) => <StatusCell value={value as HousekeepingTaskStatus} />
};

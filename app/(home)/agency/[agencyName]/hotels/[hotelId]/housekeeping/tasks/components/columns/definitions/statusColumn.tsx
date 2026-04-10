import type { GridColDef } from "@mui/x-data-grid";
import type { HousekeepingTask, HousekeepingTaskStatus } from "../../../types/task";
import { TaskStatusChip } from "../../TaskStatusChip";
import type { HousekeepingColumnStrategy } from "../types";

export const statusColumn: GridColDef<HousekeepingTask> = {
  field: "status",
  headerName: "Status",
  minWidth: 150,
  flex: 0.7,
  renderCell: ({ value }) => <TaskStatusChip status={value as HousekeepingTaskStatus} />
};

export const statusColumnStrategy: HousekeepingColumnStrategy = {
  key: "status",
  build: () => statusColumn
};

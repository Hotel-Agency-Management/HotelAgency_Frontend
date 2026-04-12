import type { GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { TASK_TYPE_LABELS } from "../../../constants/task";
import type { HousekeepingTask, HousekeepingTaskType } from "../../../types/task";

export const typeColumn: GridColDef<HousekeepingTask> = {
  field: "type",
  headerName: "Task Type",
  minWidth: 150,
  flex: 0.75,
  renderCell: ({ value }) => (
    <Typography variant="body2" color="text.secondary">
      {TASK_TYPE_LABELS[value as HousekeepingTaskType]}
    </Typography>
  )
};

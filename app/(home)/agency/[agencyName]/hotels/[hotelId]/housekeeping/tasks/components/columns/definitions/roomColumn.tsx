import type { GridColDef } from "@mui/x-data-grid";
import { Stack, Typography } from "@mui/material";
import type { HousekeepingTask } from "../../../types/task";
import type { HousekeepingColumnStrategy } from "../types";

export const roomColumn: GridColDef<HousekeepingTask> = {
  field: "roomNumber",
  headerName: "Room",
  minWidth: 110,
  flex: 0.5,
  renderCell: ({ row }) => (
    <Stack gap={0.25}>
      <Typography variant="body2" fontWeight={700}>{row.roomNumber}</Typography>
      <Typography variant="caption" color="text.secondary">Floor {row.floor}</Typography>
    </Stack>
  )
};

export const roomColumnStrategy: HousekeepingColumnStrategy = {
  key: "room",
  build: () => roomColumn
};

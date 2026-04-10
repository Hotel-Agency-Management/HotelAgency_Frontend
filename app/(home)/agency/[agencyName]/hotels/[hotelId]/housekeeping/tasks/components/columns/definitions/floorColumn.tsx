import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import type { HousekeepingTask } from "../../../types/task";
import type { HousekeepingColumnStrategy } from "../types";

export const floorColumn: GridColDef<HousekeepingTask> = {
  field: "floor",
  headerName: "Floor",
  minWidth: 100,
  flex: 0.45,
  renderCell: ({ value }) => (
    <Typography variant="body2" color="text.secondary">
      Floor {value}
    </Typography>
  )
};

export const floorColumnStrategy: HousekeepingColumnStrategy = {
  key: "floor",
  build: () => floorColumn
};

import type { GridColDef } from "@mui/x-data-grid";
import { Stack, Typography, Avatar } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { getInitials } from "../../../../utils/task";
import type { HousekeepingTask } from "../../../types/task";
import type { HousekeepingColumnStrategy } from "../types";

type AssignedColumnParams = { primaryColor: string };

export function createAssignedColumn({ primaryColor }: AssignedColumnParams): GridColDef<HousekeepingTask> {
  return {
    field: "assignedTo",
    headerName: "Assigned To",
    minWidth: 180,
    flex: 0.95,
    renderCell: ({ value }) => (
      <Stack direction="row" alignItems="center" gap={1.25}>
        <Avatar sx={{ width: 28, height: 28, bgcolor: alpha(primaryColor, 0.18), color: primaryColor }}>
          {getInitials(value ?? "")}
        </Avatar>
        <Typography variant="body2" noWrap>{value}</Typography>
      </Stack>
    )
  };
}

export const assignedColumnStrategy: HousekeepingColumnStrategy = {
  key: "assigned",
  build: ({ primaryColor }) => createAssignedColumn({ primaryColor })
};

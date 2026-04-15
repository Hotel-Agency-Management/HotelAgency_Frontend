import type { GridColDef } from "@mui/x-data-grid";
import { Stack, Tooltip, IconButton } from "@mui/material";
import { alpha, type Theme } from "@mui/material/styles";
import { Pencil, Trash2 } from "lucide-react";
import type { HousekeepingTask } from "../../../types/task";

type ActionParams = {
  primaryColor: string;
  theme: Theme;
  onEdit: (task: HousekeepingTask) => void;
  onDelete: (task: HousekeepingTask) => void;
};

export function createActionsColumn({
  primaryColor,
  theme,
  onEdit,
  onDelete,
}: ActionParams): GridColDef<HousekeepingTask> {
  return {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    minWidth: 120,
    flex: 0.45,
    align: "center",
    headerAlign: "center",
    renderCell: ({ row }) => (
      <Stack direction="row" gap={0.5} alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
        <Tooltip title="Edit Task">
          <IconButton
            size="small"
            onClick={() => onEdit(row)}
            sx={{ color: primaryColor, bgcolor: alpha(primaryColor, 0.1), "&:hover": { bgcolor: alpha(primaryColor, 0.18) } }}
          >
            <Pencil size={16} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Task">
          <IconButton
            size="small"
            onClick={() => onDelete(row)}
            sx={{ color: theme.palette.error.main, bgcolor: alpha(theme.palette.error.main, 0.1), "&:hover": { bgcolor: alpha(theme.palette.error.main, 0.18) } }}
          >
            <Trash2 size={16} />
          </IconButton>
        </Tooltip>
      </Stack>
    )
  };
}

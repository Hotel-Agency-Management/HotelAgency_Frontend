import type { GridColDef } from "@mui/x-data-grid";
import { Stack, Tooltip, IconButton } from "@mui/material";
import { alpha, type Theme } from "@mui/material/styles";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";
import type { HousekeepingTask } from "../../../types/task";
import { HOUSEKEEPING_TASK_TYPE } from "../../../types/task";
import Can from "@/components/ability/Can";
import { StyledWarningIconButton } from "../../../styles/StyledComponents";

type ActionParams = {
  primaryColor: string;
  theme: Theme;
  onEdit: (task: HousekeepingTask) => void;
  onDelete: (task: HousekeepingTask) => void;
  onReportDamage?: (task: HousekeepingTask) => void;
};

export function createActionsColumn({
  primaryColor,
  theme,
  onEdit,
  onDelete,
  onReportDamage,
}: ActionParams): GridColDef<HousekeepingTask> {
  return {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    minWidth: 140,
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
        {row.type === HOUSEKEEPING_TASK_TYPE.CHECKOUT && onReportDamage && (
          <Can do="create" this="DamageReports">
            <Tooltip title="Report Damage">
              <StyledWarningIconButton size="small" onClick={() => onReportDamage(row)}>
                <AlertTriangle size={16} />
              </StyledWarningIconButton>
            </Tooltip>
          </Can>
        )}
      </Stack>
    )
  };
}

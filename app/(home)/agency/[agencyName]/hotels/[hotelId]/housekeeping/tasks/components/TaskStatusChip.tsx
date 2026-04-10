"use client";

import Chip from "@mui/material/Chip";
import { alpha, useTheme } from "@mui/material/styles";
import type { HousekeepingTaskStatus } from "../types/task";
import { STATUS_LABELS } from "../constants/taskChip";

export function TaskStatusChip({ status }: { status: HousekeepingTaskStatus }) {
  const theme = useTheme();

  const paletteByStatus = {
    PENDING: theme.palette.warning.main,
    IN_PROGRESS: theme.palette.info.main,
    COMPLETED: theme.palette.success.main
  };

  const color = paletteByStatus[status];

  return (
    <Chip
      size="small"
      label={STATUS_LABELS[status]}
      sx={{
        bgcolor: alpha(color, 0.14),
        color,
        fontWeight: 700
      }}
    />
  );
}

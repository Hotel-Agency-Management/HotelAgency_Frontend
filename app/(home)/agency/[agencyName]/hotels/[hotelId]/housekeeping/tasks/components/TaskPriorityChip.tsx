"use client";

import Chip from "@mui/material/Chip";
import { alpha, useTheme } from "@mui/material/styles";
import type { HousekeepingTaskPriority } from "../types/task";
import { PRIORITY_LABELS } from "../constants/taskChip";

export function TaskPriorityChip({ priority }: { priority: HousekeepingTaskPriority }) {
  const theme = useTheme();

  const paletteByPriority = {
    LOW: theme.palette.success.main,
    MEDIUM: theme.palette.warning.main,
    HIGH: theme.palette.error.main
  };

  const color = paletteByPriority[priority];

  return (
    <Chip
      size="small"
      label={PRIORITY_LABELS[priority]}
      sx={{
        bgcolor: alpha(color, 0.14),
        color,
        fontWeight: 700
      }}
    />
  );
}

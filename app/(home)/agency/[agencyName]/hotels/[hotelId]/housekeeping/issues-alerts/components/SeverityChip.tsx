"use client";

import { Icon } from "@iconify/react";
import Chip from "@mui/material/Chip";
import { alpha, useTheme } from "@mui/material/styles";
import { SEVERITY_META } from "../constants/issueAlerts";
import type { HousekeepingIssueSeverity } from "../types/issue";

export function SeverityChip({ severity }: { severity: HousekeepingIssueSeverity }) {
  const theme = useTheme();
  const meta = SEVERITY_META[severity];
  const color = theme.palette[meta.palette].main;

  return (
    <Chip
      size="small"
      label={meta.label}
      icon={<Icon icon={meta.icon} width={14} height={14} />}
      sx={{
        height: 26,
        borderRadius: 1,
        bgcolor: alpha(color, 0.12),
        color,
        fontWeight: 700,
        ".MuiChip-icon": {
          color
        }
      }}
    />
  );
}

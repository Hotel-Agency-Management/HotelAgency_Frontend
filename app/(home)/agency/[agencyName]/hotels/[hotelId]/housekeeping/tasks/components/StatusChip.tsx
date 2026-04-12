"use client";

import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";

interface StatusChipProps {
  label: string;
  color: string;
}

export function StatusChip({ label, color }: StatusChipProps) {

  return (
    <Chip
      size="small"
      label={label}
      sx={{
        bgcolor: alpha(color, 0.14),
        color,
        fontWeight: 700,
      }}
    />
  );
}

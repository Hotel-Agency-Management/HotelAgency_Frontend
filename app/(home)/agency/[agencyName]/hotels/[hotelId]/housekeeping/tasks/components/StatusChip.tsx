import { alpha, useTheme } from "@mui/material";
import Chip from "@mui/material/Chip";
import type { Palette } from "@mui/material/styles";

type PaletteColorKey = keyof Pick<Palette, "primary" | "secondary" | "error" | "warning" | "info" | "success">;

export function StatusChip({ label, colorKey }: { label: string; colorKey: PaletteColorKey }) {
  const theme = useTheme();
  const color = theme.palette[colorKey].main;

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

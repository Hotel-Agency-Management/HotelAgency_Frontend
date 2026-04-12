import { alpha, darken, lighten } from "@mui/material/styles";
export function buildHousekeepingPalette(primary: string, secondary: string, tertiary: string, isDarkMode: boolean) {
  return [
    primary,
    secondary,
    tertiary,
    isDarkMode ? lighten(primary, 0.18) : darken(primary, 0.12),
    isDarkMode ? alpha(secondary, 0.88) : darken(secondary, 0.08)
  ];
}

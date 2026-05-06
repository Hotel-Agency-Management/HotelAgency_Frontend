import { useTheme } from '@mui/material/styles'

/**
 * Brand-derived chart color palette.
 * Sourced from core/theme/palette/index.ts to stay in sync with the design system.
 */
export const CHART_COLORS: string[] = [
  '#f97316', // primary orange  (brand[500])
  '#00D0FF', // secondary cyan  (secondary.main)
  '#11C28B', // success green   (success.main)
  '#55ADFF', // info blue       (info.main)
  '#FFB703', // warning yellow  (warning.main)
  '#8B5CF6', // purple          (customColors.planAvatar)
  '#FF4D4F', // error red       (error.main)
  '#27AAE1', // aqua            (customColors.lightAqua)
]

/** Returns the color at `index`, cycling through the palette if needed. */
export function getChartColor(index: number, customColors?: string[]): string {
  const palette = customColors ?? CHART_COLORS
  return palette[index % palette.length]
}

/**
 * Hook that returns a branding-derived chart palette.
 * All 8 slots come from the active user theme (primary, secondary, tertiary)
 * so the palette automatically updates when the agency owner changes their brand colors.
 *
 * Slot mapping:
 *   0 primary.main   1 secondary.main   2 tertiary (planAvatar)
 *   3 primary.light  4 secondary.light
 *   5 primary.dark   6 secondary.dark   7 lightAqua (secondary tint)
 */
export function useChartColors(customColors?: string[]): string[] {
  const theme = useTheme()

  if (customColors) return customColors

  return [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.customColors.planAvatar,
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.primary.dark,
    theme.palette.secondary.dark,
    theme.palette.customColors.lightAqua,
  ]
}

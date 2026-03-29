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
 * Hook that returns a theme-aware chart palette.
 * Values are read directly from the MUI theme so they respond to
 * theme mode changes (dark / light) at runtime.
 */
export function useChartColors(customColors?: string[]): string[] {
  const theme = useTheme()

  if (customColors) return customColors

  return [
    theme.palette.primary.main,             // #f97316
    theme.palette.secondary.main,           // #00D0FF
    theme.palette.success.main,             // #11C28B
    theme.palette.info.main,               // #55ADFF
    theme.palette.warning.main,            // #FFB703
    theme.palette.customColors.planAvatar, // #8B5CF6
    theme.palette.error.main,             // #FF4D4F
    theme.palette.customColors.lightAqua, // #27AAE1
  ]
}

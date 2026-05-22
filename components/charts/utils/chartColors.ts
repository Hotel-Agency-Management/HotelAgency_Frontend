import { darken, getLuminance, lighten, useTheme } from '@mui/material/styles'

/**
 * Static fallback palette — used by `getChartColor` in non-hook contexts.
 * Colors intentionally span hue and luminance so adjacent series are always distinct.
 */
export const CHART_COLORS: string[] = [
  '#f97316', // orange
  '#00D0FF', // cyan
  '#11C28B', // green
  '#55ADFF', // blue
  '#FFB703', // yellow
  '#8B5CF6', // purple
  '#FF4D4F', // red
  '#27AAE1', // aqua
]

/** Returns the color at `index`, cycling through the palette if needed. */
export function getChartColor(index: number, customColors?: string[]): string {
  const palette = customColors ?? CHART_COLORS
  return palette[index % palette.length]
}

// ---------------------------------------------------------------------------
// Contrast helpers (WCAG 2.1)
// ---------------------------------------------------------------------------

/** Contrast ratio between two colors (range 1-21). */
function contrastRatio(a: string, b: string): number {
  const la = getLuminance(a)
  const lb = getLuminance(b)
  const [lighter, darker] = la > lb ? [la, lb] : [lb, la]
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Nudges `color` in 0.08-step increments until it reaches `minRatio` contrast
 * against `bg` (max 12 iterations). Darkens on light backgrounds, lightens on dark.
 */
function ensureContrast(color: string, bg: string, minRatio: number): string {
  if (contrastRatio(color, bg) >= minRatio) return color
  const bgIsLight = getLuminance(bg) > 0.179
  if (!bgIsLight) return color

  let c = color
  for (let i = 0; i < 12; i++) {
    c = darken(c, 0.08)
    if (contrastRatio(c, bg) >= minRatio) break
  }
  return c
}

type RgbColor = { r: number; g: number; b: number }

function parseRgb(color: string): RgbColor | null {
  if (color.startsWith('#')) {
    const rawHex = color.slice(1)
    const hex =
      rawHex.length === 3
        ? rawHex
            .split('')
            .map(char => `${char}${char}`)
            .join('')
        : rawHex

    if (hex.length !== 6) return null

    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
    }
  }

  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!rgbMatch) return null

  return {
    r: Number(rgbMatch[1]),
    g: Number(rgbMatch[2]),
    b: Number(rgbMatch[3]),
  }
}

function getSaturation(color: string): number {
  const rgb = parseRgb(color)
  if (!rgb) return 1

  const channels = [rgb.r / 255, rgb.g / 255, rgb.b / 255]
  const max = Math.max(...channels)
  const min = Math.min(...channels)
  const lightness = (max + min) / 2

  if (max === min) return 0

  const delta = max - min
  return lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min)
}

function chartColorGroup(color: string): number {
  return getSaturation(color) >= 0.35 ? 0 : 1
}

// ---------------------------------------------------------------------------
// Dynamic theme-aware palette
// ---------------------------------------------------------------------------

/**
 * Returns a chart palette that is always in sync with the active brand theme and
 * readable in both light and dark mode.
 *
 * **How it works:**
 * 1. Three seed colors are taken from the active branding: `primary.main`,
 *    `secondary.main`, and `tertiary.main`. These change whenever an agency owner
 *    updates their brand colors.
 * 2. Each seed expands into three luminance tiers - dark (-0.45), mid (base),
 *    and light (+0.45) - giving nine distinct slots.
 * 3. Every slot is checked against `background.paper` using the WCAG contrast ratio
 *    formula. If a slot falls below 2.5:1 it is nudged (darkened on light bg /
 *    lightened on dark bg) in 0.08-step increments until it passes.
 * 4. The nine slots are interleaved by luminance tier, not by hue family, so
 *    consecutive chart segments (index 0 -> 1 -> 2 ...) always cross a hue boundary:
 *
 *      [pDark, sDark, tDark, pMid, sMid, tMid, pLight, sLight, tLight]
 *
 *    This guarantees both hue variety (adjacent slices look different) and a full
 *    dark-to-light luminance spread across the palette.
 */
export function useChartColors(customColors?: string[]): string[] {
  const theme = useTheme()

  if (customColors) return customColors

  const bg = theme.palette.background.paper
  const { primary, secondary, tertiary } = theme.palette

  // 2.5:1 - visible for filled shapes without forcing colors to extremes.
  // Sits below WCAG AA for text (4.5:1) since chart slices are large decorative areas.
  const MIN_RATIO = 2.5

  const buildFamily = (base: string): [string, string, string] => [
    ensureContrast(darken(base, 0.45), bg, MIN_RATIO),
    ensureContrast(base, bg, MIN_RATIO),
    ensureContrast(lighten(base, 0.45), bg, MIN_RATIO),
  ]

  const [pDark, pMid, pLight] = buildFamily(primary.main)
  const [sDark, sMid, sLight] = buildFamily(secondary.main)
  const [tDark, tMid, tLight] = buildFamily(tertiary.main)

  return [pDark, pMid, pLight, sDark, sMid, sLight, tDark, tMid, tLight].sort((firstColor, secondColor) => {
    const groupDelta = chartColorGroup(firstColor) - chartColorGroup(secondColor)
    if (groupDelta !== 0) return groupDelta

    return getLuminance(firstColor) - getLuminance(secondColor)
  })
}

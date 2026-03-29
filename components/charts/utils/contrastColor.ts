/**
 * Returns the WCAG-compliant contrast text color ('#ffffff' or '#000000')
 * that achieves the best readability against the given background color.
 *
 * Supports hex (#rgb, #rrggbb) and rgb(...) / rgba(...) strings.
 *
 * Algorithm: converts the background to relative luminance using the WCAG 2.1
 * formula, then picks black or white based on the contrast ratio threshold.
 *
 * @example
 * getContrastColor('#f97316')  // '#000000'  (orange is bright)
 * getContrastColor('#0c0c0c')  // '#ffffff'  (dark background)
 * getContrastColor('rgb(200, 50, 50)') // '#ffffff'
 */
export function getContrastColor(background: string): '#ffffff' | '#000000' {
  const [r, g, b] = parseColor(background)

  // Convert 0-255 sRGB channels to linear light values
  const toLinear = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }

  // WCAG relative luminance
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

  // Contrast ratio against white  = (L + 0.05) / 0.05
  // Contrast ratio against black  = 1.05 / (L + 0.05)
  // Pick whichever gives a higher ratio
  return L > 0.179 ? '#000000' : '#ffffff'
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Parses a color string into [r, g, b] (0–255). */
function parseColor(color: string): [number, number, number] {
  const s = color.trim()

  // rgb(...) / rgba(...)
  const rgbMatch = s.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgbMatch) {
    return [Number(rgbMatch[1]), Number(rgbMatch[2]), Number(rgbMatch[3])]
  }

  // Hex color
  let hex = s.replace(/^#/, '')
  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('')
  }

  if (hex.length >= 6) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ]
  }

  // Fallback: assume dark background → white text
  return [0, 0, 0]
}

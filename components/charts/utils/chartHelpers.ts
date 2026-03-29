/**
 * Calculates percentages from raw values using the Largest Remainder Method.
 * This guarantees the resulting array always sums to exactly 100,
 * avoiding the common floating-point rounding problem (e.g., 33+33+33 = 99).
 *
 * @example
 * calculatePercentages([1, 1, 1]) // [34, 33, 33]  ← sums to 100
 */
export function calculatePercentages(data: number[]): number[] {
  const total = data.reduce((sum, v) => sum + v, 0)
  if (total === 0) return data.map(() => 0)

  const raw = data.map(v => (v / total) * 100)
  const floored = raw.map(Math.floor)

  const remainders = raw.map((r, i) => ({ index: i, remainder: r - floored[i] }))
  let remaining = 100 - floored.reduce((s, f) => s + f, 0)

  remainders
    .sort((a, b) => b.remainder - a.remainder)
    .forEach(({ index }) => {
      if (remaining > 0) {
        floored[index] += 1
        remaining -= 1
      }
    })

  return floored
}

/**
 * For multi-series charts: returns each value as a percentage of the
 * grand total across ALL series combined.
 *
 * @returns A 2D array matching the shape of `allSeriesData`
 */
export function calculateMultiSeriesPercentages(allSeriesData: number[][]): number[][] {
  const grandTotal = allSeriesData.flat().reduce((sum, v) => sum + v, 0)
  if (grandTotal === 0) return allSeriesData.map(s => s.map(() => 0))

  return allSeriesData.map(series =>
    series.map(v => Math.round((v / grandTotal) * 1000) / 10) // one decimal place
  )
}

/**
 * Interpolates between two hex colors based on a ratio in [0, 1].
 * Used by HeatmapChart to map cell values to colors.
 */
export function interpolateColor(colorA: string, colorB: string, ratio: number): string {
  const parse = (hex: string) => {
    const h = hex.replace('#', '')
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ]
  }
  const [r1, g1, b1] = parse(colorA)
  const [r2, g2, b2] = parse(colorB)

  const r = Math.round(r1 + (r2 - r1) * ratio)
  const g = Math.round(g1 + (g2 - g1) * ratio)
  const b = Math.round(b1 + (b2 - b1) * ratio)

  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Formats a value for tooltip display when percentages are active.
 * Falls back to a plain string when no percentage config is provided.
 */
export function formatWithPercentage(
  value: number,
  index: number,
  options: { percentageData?: number[]; calculatedPercentages?: number[] }
): string {
  const { percentageData, calculatedPercentages } = options
  if (percentageData) return `${value} (${percentageData[index] ?? 0}%)`
  if (calculatedPercentages) return `${value} (${calculatedPercentages[index] ?? 0}%)`
  return String(value)
}

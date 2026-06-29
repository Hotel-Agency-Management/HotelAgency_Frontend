import type { OpenTicketsSeriesItem } from '../types/housekeepingDashboardTypes'
import { DEFAULT_DAY_LABELS, DEFAULT_MONTH_LABELS } from '../constants/heatmapConfig'

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export interface HeatmapLabels {
  dayLabels: readonly string[]
  monthLabels: readonly string[]
  openLabel: string
  dayBeforeMonth?: boolean
}

export interface HeatmapGrid {
  data: number[][]
  rowLabels: readonly string[]
  colLabels: string[]
  tooltipLabels: string[][]
  /** Cells outside the actual data range — rendered as empty space, not colored squares. */
  maskedCells: boolean[][]
}

/**
 * Converts a flat [{date, open}] series into a day-of-week × calendar-week
 * grid suitable for HeatmapChart.
 * Rows = Sun–Sat, Columns = calendar weeks anchored to the first Sunday ≤ first date.
 * Cells before the first date or after the last date are masked (hidden).
 * Pass `labels` to render day names, month names, and the "open" word in the active language.
 */
export function buildOpenTicketsHeatmap(
  series: OpenTicketsSeriesItem[],
  labels: HeatmapLabels = { dayLabels: DEFAULT_DAY_LABELS, monthLabels: DEFAULT_MONTH_LABELS, openLabel: 'open' }
): HeatmapGrid {
  const { dayLabels, monthLabels, openLabel, dayBeforeMonth = false } = labels

  if (!series.length) {
    return { data: [], rowLabels: dayLabels, colLabels: [], tooltipLabels: [], maskedCells: [] }
  }

  const openByDate = new Map(series.map(s => [s.date, s.open]))

  const firstDate = parseLocalDate(series[0].date)
  const lastDate = parseLocalDate(series[series.length - 1].date)

  // Anchor the grid start to the Sunday on or before the first date
  const gridStart = new Date(firstDate)
  gridStart.setDate(firstDate.getDate() - firstDate.getDay())

  // Anchor the grid end to the Saturday on or after the last date
  const gridEnd = new Date(lastDate)
  gridEnd.setDate(lastDate.getDate() + (6 - lastDate.getDay()))

  const totalDays = Math.round((gridEnd.getTime() - gridStart.getTime()) / 86400000) + 1
  const numWeeks = Math.ceil(totalDays / 7)

  // Column labels: "M/D" of each week's Sunday
  const colLabels: string[] = []
  for (let w = 0; w < numWeeks; w++) {
    const weekSunday = new Date(gridStart)
    weekSunday.setDate(gridStart.getDate() + w * 7)
    colLabels.push(`${weekSunday.getMonth() + 1}/${weekSunday.getDate()}`)
  }

  const data: number[][] = Array.from({ length: 7 }, () => Array(numWeeks).fill(0))
  const tooltipLabels: string[][] = Array.from({ length: 7 }, () => Array(numWeeks).fill(''))
  const maskedCells: boolean[][] = Array.from({ length: 7 }, () => Array(numWeeks).fill(false))

  for (let w = 0; w < numWeeks; w++) {
    for (let d = 0; d < 7; d++) {
      const cell = new Date(gridStart)
      cell.setDate(gridStart.getDate() + w * 7 + d)

      const isOutOfRange = cell < firstDate || cell > lastDate
      const open = openByDate.get(toDateKey(cell)) ?? 0

      data[d][w] = open
      maskedCells[d][w] = isOutOfRange
      const datePart = dayBeforeMonth
        ? `${cell.getDate()} ${monthLabels[cell.getMonth()]}`
        : `${monthLabels[cell.getMonth()]} ${cell.getDate()}`
      tooltipLabels[d][w] = `${dayLabels[d]}, ${datePart} · ${open} ${openLabel}`
    }
  }

  return { data, rowLabels: dayLabels, colLabels, tooltipLabels, maskedCells }
}

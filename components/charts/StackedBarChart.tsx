'use client'

import Box from '@mui/material/Box'
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart'
import { useChartColors } from './utils/chartColors'
import { calculateMultiSeriesPercentages } from './utils/chartHelpers'
import { useSeriesToggle } from './hooks/useSeriesToggle'
import ChartLegend from './ChartLegend'
import type { BaseChartProps, MultiSeriesItem } from './types'

export interface StackedBarChartProps extends BaseChartProps {
  series: MultiSeriesItem[]
  labels: string[]
  borderRadius?: number
  /** Normalize each bar to 100% (100% stacked bar chart) */
  normalized?: boolean
  /** Number of rows in x-axis tick labels (increases bottom margin per extra row) */
  labelRows?: number
}

/**
 * Stacked bar chart — multiple series stacked vertically.
 *
 * Hovering a series highlights the entire series and fades the rest.
 * Clicking a legend item toggles that series on/off.
 * `percentage`: each value is shown as % of the grand total across all series.
 * `percentageData`: flat array `[series0val0, series0val1, ..., seriesNvalM]` for manual control.
 */
export default function StackedBarChart({
  series,
  labels,
  borderRadius = 4,
  height = 300,
  colors,
  showLegend = true,
  percentage = false,
  percentageData,
  normalized = false,
  labelRows = 1,
}: StackedBarChartProps) {
  const chartColors = useChartColors(colors)
  const { hiddenLabels, toggle } = useSeriesToggle()

  const rawMatrix = series.map(s => s.data)

  // For normalized mode, convert each column to its % share of the column total
  const colTotals = normalized
    ? labels.map((_, ci) => rawMatrix.reduce((sum, row) => sum + (row[ci] ?? 0), 0))
    : []
  const normalizedMatrix = normalized
    ? rawMatrix.map(row => row.map((v, ci) => colTotals[ci] ? Math.round((v / colTotals[ci]) * 100) : 0))
    : rawMatrix

  const maxRawValue = Math.max(...rawMatrix.flat(), 0)
  const calculatedPercentages =
    percentage && !percentageData && !normalized ? calculateMultiSeriesPercentages(rawMatrix) : undefined

  const muiSeries = series.map((s, si) => {
    const seriesPercentages = calculatedPercentages?.[si]
    const flatOffset = series.slice(0, si).reduce((acc, prev) => acc + prev.data.length, 0)

    const valueFormatter = (value: number | null, context: { dataIndex: number }) => {
      if (value === null) return ''
      if (normalized) return `${value}%`
      if (percentageData) {
        const pct = percentageData[flatOffset + context.dataIndex] ?? 0
        return `${value} (${pct}%)`
      }
      if (seriesPercentages) {
        const pct = seriesPercentages[context.dataIndex] ?? 0
        return `${value} (${pct}%)`
      }
      return String(value)
    }

    return {
      data: normalizedMatrix[si],
      label: s.label,
      stack: 'total',
      color: chartColors[si % chartColors.length],
      highlightScope: { highlight: 'series', fade: 'global' } as const,
      valueFormatter,
    }
  })

  const visibleSeries = muiSeries.filter(s => !hiddenLabels.has(s.label))

  const legendItems = series.map((s, si) => ({
    label: s.label,
    color: chartColors[si % chartColors.length],
  }))

  return (
    <Box sx={{ width: '100%' }}>
      {showLegend && (
        <ChartLegend items={legendItems} hiddenLabels={hiddenLabels} onToggle={toggle} />
      )}
      <MuiBarChart
        series={visibleSeries}
        xAxis={[{ data: labels, scaleType: 'band' }]}
        yAxis={normalized ? [{ min: 0, max: 100 }] : [{ min: 0, max: maxRawValue > 0 ? undefined : 1, tickMinStep: 1 }]}
        height={height}
        borderRadius={borderRadius}
        hideLegend
        margin={{ top: 16, right: labelRows > 1 ? 52 : 16, bottom: 40 + (labelRows - 1) * 20, left: 52 }}
      />
    </Box>
  )
}

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
}: StackedBarChartProps) {
  const chartColors = useChartColors(colors)
  const { hiddenLabels, toggle } = useSeriesToggle()

  const rawMatrix = series.map(s => s.data)
  const calculatedPercentages =
    percentage && !percentageData ? calculateMultiSeriesPercentages(rawMatrix) : undefined

  const muiSeries = series.map((s, si) => {
    const seriesPercentages = calculatedPercentages?.[si]
    const flatOffset = series.slice(0, si).reduce((acc, prev) => acc + prev.data.length, 0)

    const valueFormatter = (value: number | null, context: { dataIndex: number }) => {
      if (value === null) return ''
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
      data: s.data,
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
        height={height}
        borderRadius={borderRadius}
        hideLegend
        margin={{ top: 16, right: 16, bottom: 40, left: 52 }}
      />
    </Box>
  )
}

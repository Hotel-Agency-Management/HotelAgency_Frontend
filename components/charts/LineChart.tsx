'use client'

import Box from '@mui/material/Box'
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart'
import { useChartColors } from './utils/chartColors'
import { calculateMultiSeriesPercentages } from './utils/chartHelpers'
import { useSeriesToggle } from './hooks/useSeriesToggle'
import ChartLegend from './ChartLegend'
import type { BaseChartProps, MultiSeriesItem } from './types'

export interface LineChartProps extends BaseChartProps {
  /** Array of named series */
  series: MultiSeriesItem[]
  /** Labels for the x-axis (one per data point) */
  labels: string[]
}

/**
 * Line chart — one or more series plotted as connected lines.
 *
 * Hovering a data point highlights it and fades all others.
 * Clicking a legend item toggles that series on/off.
 * `percentage`: each value is shown as % of the grand total across all series.
 * `percentageData`: flat array for manual percentage control.
 */
export default function LineChart({
  series,
  labels,
  height = 300,
  colors,
  showLegend = true,
  percentage = false,
  percentageData,
}: LineChartProps) {
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
      color: chartColors[si % chartColors.length],
      highlightScope: { highlight: 'item', fade: 'global' } as const,
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
      <MuiLineChart
        series={visibleSeries}
        xAxis={[{ data: labels, scaleType: 'point' }]}
        height={height}
        hideLegend
        margin={{ top: 16, right: 16, bottom: 40, left: 52 }}
      />
    </Box>
  )
}

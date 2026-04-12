'use client'

import Box from '@mui/material/Box'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart'
import { useChartColors } from './utils/chartColors'
import { calculatePercentages } from './utils/chartHelpers'
import { useSeriesToggle } from './hooks/useSeriesToggle'
import ChartLegend from './ChartLegend'
import type { BaseChartProps, PieDataPoint } from './types'

export interface DoughnutChartProps extends BaseChartProps {
  data: PieDataPoint[]
  /**
   * Inner radius of the doughnut hole in px (default: 60).
   * Increase for a thinner ring, decrease for a thicker one.
   */
  innerRadius?: number
  /**
   * Outer radius of the chart in px (default: 100).
   * Leave undefined to let the chart fill its container.
   */
  outerRadius?: number
  cornerRadius?: number
  paddingAngle?: number
  legendPosition?: 'top' | 'bottom'
  legendAlign?: 'start' | 'center'
}

/**
 * Doughnut chart — a pie chart with a hollow center.
 *
 * Hovering a slice highlights it and fades all others.
 * Clicking a legend item toggles that slice on/off.
 * Arcs have rounded ends (`cornerRadius`) for a polished look.
 * `percentage`: calculates each slice's share from the FULL original data —
 *   percentages are stable and do not change when slices are hidden.
 * `percentageData`: supply your own percentages (one per slice, in order of original data).
 */
export default function DoughnutChart({
  data,
  innerRadius = 60,
  outerRadius = 100,
  cornerRadius = 8,
  paddingAngle = 2,
  height = 300,
  colors,
  showLegend = true,
  legendPosition = 'top',
  legendAlign = 'start',
  percentage = false,
  percentageData
}: DoughnutChartProps) {
  const chartColors = useChartColors(colors)
  const { hiddenLabels, toggle } = useSeriesToggle()

  // Percentages are always derived from the full original data so they
  // remain stable regardless of which slices the user hides.
  const calculatedPercentages = percentage && !percentageData ? calculatePercentages(data.map(d => d.value)) : undefined

  const activePercentages = percentageData ?? calculatedPercentages

  // Only filter for rendering — after percentages are locked in
  const visibleData = data.filter(d => !hiddenLabels.has(d.label))

  const pieData = visibleData.map(d => {
    const originalIndex = data.indexOf(d)
    const pct = activePercentages?.[originalIndex]
    return {
      id: originalIndex,
      value: d.value,
      label: pct !== undefined ? `${d.label} (${pct}%)` : d.label,
      color: chartColors[originalIndex % chartColors.length]
    }
  })

  const valueFormatter = (item: { value: number }, context: { dataIndex: number }) => {
    const originalIndex = data.indexOf(visibleData[context.dataIndex])
    const pct = activePercentages?.[originalIndex]
    if (pct !== undefined) return `${item.value} (${pct}%)`
    return String(item.value)
  }

  const legendItems = data.map((d, i) => ({
    label: d.label,
    color: chartColors[i % chartColors.length]
  }))

  return (
    <Box sx={{ width: '100%' }}>
      {showLegend && legendPosition === 'top' && (
        <ChartLegend items={legendItems} hiddenLabels={hiddenLabels} onToggle={toggle} align={legendAlign} />
      )}
      <MuiPieChart
        series={[
          {
            data: pieData,
            innerRadius,
            outerRadius,
            cornerRadius,
            paddingAngle,
            highlightScope: { highlight: 'item', fade: 'global' },
            valueFormatter
          }
        ]}
        height={height}
        hideLegend
        margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
      />
      {showLegend && legendPosition === 'bottom' && (
        <ChartLegend items={legendItems} hiddenLabels={hiddenLabels} onToggle={toggle} align={legendAlign} />
      )}
    </Box>
  )
}

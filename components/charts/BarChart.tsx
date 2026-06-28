'use client'

import Box from '@mui/material/Box'
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart'
import { useChartColors } from './utils/chartColors'
import { calculatePercentages } from './utils/chartHelpers'
import type { BaseChartProps } from './types'

export interface BarChartProps extends BaseChartProps {
  data: number[]
  labels: string[]
  color?: string
  borderRadius?: number
  /** Number of rows in x-axis tick labels (increases bottom margin per extra row) */
  labelRows?: number
}

/**
 * Vertical bar chart — single series.
 *
 * Hovered bar is highlighted; all others fade.
 * Pass `percentage` to show auto-calculated percentages in the tooltip.
 * Pass `percentageData` to supply your own percentage values instead.
 */
export default function BarChart({
  data,
  labels,
  color,
  borderRadius = 8,
  height = 300,
  colors,
  showLegend = false,
  percentage = false,
  percentageData,
  labelRows = 1,
}: BarChartProps) {
  const chartColors = useChartColors(colors)
  const resolvedColor = color ?? chartColors[1]

  const maxValue = Math.max(...data, 0)
  const calculatedPercentages = percentage && !percentageData ? calculatePercentages(data) : undefined

  const activePercentages = percentageData ?? calculatedPercentages

  const valueFormatter = (value: number | null, context: { dataIndex: number }) => {
    if (value === null) return ''
    if (activePercentages) {
      return `${value} (${activePercentages[context.dataIndex] ?? 0}%)`
    }
    return String(value)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <MuiBarChart
        series={[
          {
            data,
            color: resolvedColor,
            highlightScope: { highlight: 'item', fade: 'global' },
            valueFormatter
          }
        ]}
        xAxis={[{ data: labels, scaleType: 'band', categoryGapRatio: 0.4 }]}
        yAxis={[{ min: 0, max: maxValue > 0 ? undefined : 1, tickMinStep: 1 }]}
        height={height}
        borderRadius={borderRadius}
        hideLegend={!showLegend}
        margin={{ top: 16, right: labelRows > 1 ? 52 : 16, bottom: 40 + (labelRows - 1) * 20, left: 52 }}
      />
    </Box>
  )
}

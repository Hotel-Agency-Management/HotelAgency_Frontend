'use client'

import Box from '@mui/material/Box'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart'
import { useChartColors } from './utils/chartColors'

export interface SparklineChartProps {
  data: number[]
  variant?: 'line' | 'bar'
  height?: number
  showMark?: boolean
  area?: boolean
  color?: string
  colors?: string[]
  curve?: 'linear' | 'natural' | 'monotoneX' | 'step'
}

/**
 * Sparkline chart — a compact, minimal chart for KPI cards and table cells.
 *
 * Supports both line and bar variants. No axes or legends.
 * Ideal for conveying a trend at a glance.
 */
export default function SparklineChart({
  data,
  variant = 'line',
  height = 60,
  area = false,
  color,
  colors,
  curve = 'linear'
}: SparklineChartProps) {
  const chartColors = useChartColors(colors)
  const resolvedColor = color ?? chartColors[0]

  return (
    <Box sx={{ width: '100%' }}>
      <SparkLineChart data={data} type={variant} height={height} area={area} curve={curve} color={resolvedColor} />
    </Box>
  )
}

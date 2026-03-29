'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { useChartColors } from './utils/chartColors'
import type { BaseChartProps } from './types'

export interface GaugeChartProps extends BaseChartProps {
  value: number
  valueMin?: number
  valueMax?: number
  startAngle?: number
  endAngle?: number
  unit?: string
}

/**
 * Gauge / speedometer chart.
 *
 * Displays a single value within a min–max arc.
 * The filled arc uses the first brand color by default.
 * Pass `unit` to append a unit string below the numeric value.
 */
export default function GaugeChart({
  value,
  valueMin = 0,
  valueMax = 100,
  startAngle = -110,
  endAngle = 110,
  unit,
  height = 240,
  colors
}: GaugeChartProps) {
  const chartColors = useChartColors(colors)
  const primaryColor = chartColors[0]

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Gauge
        value={value}
        valueMin={valueMin}
        valueMax={valueMax}
        startAngle={startAngle}
        endAngle={endAngle}
        height={height}
        sx={{
          [`& .${gaugeClasses.valueArc}`]: {
            fill: primaryColor
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: 'action.disabledBackground'
          },
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 28,
            fontWeight: 700
          }
        }}
        text={({ value: v, valueMax: max }) => (unit ? `${v}${unit}` : `${v} / ${max}`)}
      />
      {unit && (
        <Typography variant='caption' color='text.secondary' align='center' display='block' mt={-2}>
          out of {valueMax}
        </Typography>
      )}
    </Box>
  )
}

'use client'

import { useMemo } from 'react'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { ChartContainer } from '@mui/x-charts/ChartContainer'
import { BarPlot } from '@mui/x-charts/BarChart'
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis'
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis'
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip'
import { ChartsLegend } from '@mui/x-charts/ChartsLegend'
import type { ChartsTextProps } from '@mui/x-charts/ChartsText'
import { useChartColors } from './utils/chartColors'
import { calculatePercentages } from './utils/chartHelpers'
import type { BaseChartProps } from './types'

export interface HorizontalBarChartProps extends BaseChartProps {
  data: number[]
  labels: string[]
  color?: string
  borderRadius?: number
  /**
   * Maximum pixel width reserved for y-axis labels (default: 120).
   * Labels exceeding this width are truncated with a CSS ellipsis.
   */
  labelWidth?: number
}

/**
 * Horizontal bar chart — single series.
 *
 * Hovered bar is highlighted; all others fade.
 * Pass `percentage` to show auto-calculated percentages in the tooltip.
 * Pass `percentageData` to supply your own percentage values instead.
 */
// 52px per bar gives comfortable spacing; 56px covers top + bottom margins
const BAR_HEIGHT = 52
const CHART_MARGINS = 56

export default function HorizontalBarChart({
  data,
  labels,
  color,
  borderRadius = 8,
  height,
  colors,
  showLegend = false,
  percentage = false,
  percentageData,
  labelWidth = 120
}: HorizontalBarChartProps) {
  const resolvedHeight = height ?? Math.max(200, labels.length * BAR_HEIGHT + CHART_MARGINS)
  const theme = useTheme()
  const chartColors = useChartColors(colors)
  const resolvedColor = color ?? chartColors[0]
  const textColor = theme.palette.text.secondary

  const calculatedPercentages = percentage && !percentageData ? calculatePercentages(data) : undefined
  const activePercentages = percentageData ?? calculatedPercentages

  const valueFormatter = (value: number | null, context: { dataIndex: number }) => {
    if (value === null) return ''
    if (activePercentages) {
      return `${value} (${activePercentages[context.dataIndex] ?? 0}%)`
    }
    return String(value)
  }

  // Custom tick label: left-aligned with CSS ellipsis truncation via foreignObject.
  // Memoized so the component reference is stable across re-renders.
  const YAxisTickLabel = useMemo(
    () =>
      function TickLabel({ x, y, text }: ChartsTextProps) {
        const PAD = 4
        return (
          <g transform={`translate(${x},${y})`}>
            <foreignObject x={-(labelWidth - PAD)} y={-10} width={labelWidth - PAD * 2} height={20}>
              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '0.75rem',
                  lineHeight: '20px',
                  color: textColor
                }}
              >
                {text}
              </div>
            </foreignObject>
          </g>
        )
      },
    [labelWidth, textColor]
  )

  return (
    <Box sx={{ width: '100%' }}>
      <ChartContainer
        series={[
          {
            type: 'bar',
            layout: 'horizontal',
            data,
            color: resolvedColor,
            highlightScope: { highlight: 'item', fade: 'global' },
            valueFormatter
          }
        ]}
        yAxis={[{ id: 'y', data: labels, scaleType: 'band', width: labelWidth }]}
        xAxis={[{ id: 'x', scaleType: 'linear' }]}
        height={resolvedHeight}
        margin={{ top: 16, right: 52, bottom: 40 }}
      >
        <BarPlot borderRadius={borderRadius} />
        <ChartsYAxis axisId='y' slots={{ axisTickLabel: YAxisTickLabel }} />
        <ChartsXAxis axisId='x' />
        <ChartsTooltip />
        {showLegend && <ChartsLegend />}
      </ChartContainer>
    </Box>
  )
}

'use client'

import Box from '@mui/material/Box'
import { ScatterChart } from '@mui/x-charts/ScatterChart'
import { useChartColors } from './utils/chartColors'
import { calculateMultiSeriesPercentages } from './utils/chartHelpers'
import { useSeriesToggle } from './hooks/useSeriesToggle'
import ChartLegend from './ChartLegend'
import type { BaseChartProps, BubbleSeriesItem } from './types'

export interface BubbleChartProps extends BaseChartProps {
  /**
   * Array of named series.
   * Each data point has `x`, `y`, and `z` (z controls bubble size).
   */
  series: BubbleSeriesItem[]
  xLabel?: string
  yLabel?: string
  /**
   * Scale factor for bubble sizes (default: 1).
   * Increase to make all bubbles larger, decrease to shrink them.
   */
  sizeScale?: number
}

/**
 * Bubble chart — a scatter plot where each point's size encodes a third dimension (`z`).
 *
 * Hovering a bubble highlights it and fades all others.
 * Clicking a legend item toggles that series on/off.
 * `percentage`: each z-value is shown as % of the grand total z across all series.
 */
export default function BubbleChart({
  series,
  xLabel,
  yLabel,
  sizeScale = 1,
  height = 300,
  colors,
  showLegend = true,
  percentage = false,
  percentageData,
}: BubbleChartProps) {
  const chartColors = useChartColors(colors)
  const { hiddenLabels, toggle } = useSeriesToggle()

  const zMatrix = series.map(s => s.data.map(p => p.z))
  const calculatedPercentages =
    percentage && !percentageData ? calculateMultiSeriesPercentages(zMatrix) : undefined

  const muiSeries = series.map((s, si) => {
    const zPercentages = calculatedPercentages?.[si]
    const flatOffset = series.slice(0, si).reduce((acc, prev) => acc + prev.data.length, 0)

    const avgZ = s.data.reduce((sum, p) => sum + p.z, 0) / (s.data.length || 1)
    const markerSize = Math.max(4, Math.sqrt(avgZ) * sizeScale * 0.3)

    return {
      label: s.label,
      color: chartColors[si % chartColors.length],
      highlightScope: { highlight: 'item', fade: 'global' } as const,
      markerSize,
      data: s.data.map((p, pi) => ({
        x: p.x,
        y: p.y,
        id: `${si}-${pi}`,
      })),
      valueFormatter: (point: { x: number; y: number } | null, context: { dataIndex: number }) => {
        if (point === null) return ''
        const z = s.data[context.dataIndex]?.z ?? 0
        if (percentage || percentageData) {
          const pct = percentageData
            ? (percentageData[flatOffset + context.dataIndex] ?? 0)
            : (zPercentages?.[context.dataIndex] ?? 0)
          return `x: ${point.x}, y: ${point.y}, z: ${z} (${pct}%)`
        }
        return `x: ${point.x}, y: ${point.y}, z: ${z}`
      },
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
      <ScatterChart
        series={visibleSeries}
        xAxis={[{ label: xLabel }]}
        yAxis={[{ label: yLabel }]}
        height={height}
        hideLegend
        margin={{ top: 16, right: 16, bottom: xLabel ? 56 : 40, left: yLabel ? 72 : 52 }}
      />
    </Box>
  )
}

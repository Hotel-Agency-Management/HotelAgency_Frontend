'use client'

import BarChart from './BarChart'
import HorizontalBarChart from './HorizontalBarChart'
import StackedBarChart from './StackedBarChart'
import ClusteredBarChart from './ClusteredBarChart'
import PieChart from './PieChart'
import DoughnutChart from './DoughnutChart'
import LineChart from './LineChart'
import AreaChart from './AreaChart'
import GaugeChart from './GaugeChart'
import BubbleChart from './BubbleChart'
import SparklineChart from './SparklineChart'
import HeatmapChart from './HeatmapChart'

import type { BarChartProps } from './BarChart'
import type { HorizontalBarChartProps } from './HorizontalBarChart'
import type { StackedBarChartProps } from './StackedBarChart'
import type { ClusteredBarChartProps } from './ClusteredBarChart'
import type { PieChartProps } from './PieChart'
import type { DoughnutChartProps } from './DoughnutChart'
import type { LineChartProps } from './LineChart'
import type { AreaChartProps } from './AreaChart'
import type { GaugeChartProps } from './GaugeChart'
import type { BubbleChartProps } from './BubbleChart'
import type { SparklineChartProps } from './SparklineChart'
import type { HeatmapChartProps } from './HeatmapChart'

// ---------------------------------------------------------------------------
// Discriminated union: each variant carries its type + the correct props
// ---------------------------------------------------------------------------

export type ChartFactoryProps =
  | ({ type: 'Bar' } & BarChartProps)
  | ({ type: 'HorizontalBar' } & HorizontalBarChartProps)
  | ({ type: 'StackedBar' } & StackedBarChartProps)
  | ({ type: 'ClusteredBar' } & ClusteredBarChartProps)
  | ({ type: 'Pie' } & PieChartProps)
  | ({ type: 'Doughnut' } & DoughnutChartProps)
  | ({ type: 'Line' } & LineChartProps)
  | ({ type: 'Area' } & AreaChartProps)
  | ({ type: 'Gauge' } & GaugeChartProps)
  | ({ type: 'Bubble' } & BubbleChartProps)
  | ({ type: 'Sparkline' } & SparklineChartProps)
  | ({ type: 'Heatmap' } & HeatmapChartProps)

/**
 * ChartFactory — renders the correct chart component based on `type`.
 *
 * TypeScript narrows the props automatically so you get full IntelliSense
 * and type safety for every chart variant.
 *
 * @example
 * // Vertical bar chart
 * <ChartFactory type="Bar" data={[10, 30, 20]} labels={['A', 'B', 'C']} />
 *
 * @example
 * // Doughnut with percentages
 * <ChartFactory
 *   type="Doughnut"
 *   data={[{ label: 'Done', value: 75 }, { label: 'Left', value: 25 }]}
 *   percentage
 * />
 *
 * @example
 * // Stacked bar with legend
 * <ChartFactory
 *   type="StackedBar"
 *   series={[{ label: 'Q1', data: [4, 6] }, { label: 'Q2', data: [3, 8] }]}
 *   labels={['Jan', 'Feb']}
 *   showLegend
 * />
 */
export default function ChartFactory(props: ChartFactoryProps) {
  switch (props.type) {
    case 'Bar': {
      const { type: _, ...rest } = props
      return <BarChart {...rest} />
    }
    case 'HorizontalBar': {
      const { type: _, ...rest } = props
      return <HorizontalBarChart {...rest} />
    }
    case 'StackedBar': {
      const { type: _, ...rest } = props
      return <StackedBarChart {...rest} />
    }
    case 'ClusteredBar': {
      const { type: _, ...rest } = props
      return <ClusteredBarChart {...rest} />
    }
    case 'Pie': {
      const { type: _, ...rest } = props
      return <PieChart {...rest} />
    }
    case 'Doughnut': {
      const { type: _, ...rest } = props
      return <DoughnutChart {...rest} />
    }
    case 'Line': {
      const { type: _, ...rest } = props
      return <LineChart {...rest} />
    }
    case 'Area': {
      const { type: _, ...rest } = props
      return <AreaChart {...rest} />
    }
    case 'Gauge': {
      const { type: _, ...rest } = props
      return <GaugeChart {...rest} />
    }
    case 'Bubble': {
      const { type: _, ...rest } = props
      return <BubbleChart {...rest} />
    }
    case 'Sparkline': {
      const { type: _, ...rest } = props
      return <SparklineChart {...rest} />
    }
    case 'Heatmap': {
      const { type: _, ...rest } = props
      return <HeatmapChart {...rest} />
    }
  }
}

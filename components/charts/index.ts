// Chart components
export { default as BarChart } from './BarChart'
export { default as HorizontalBarChart } from './HorizontalBarChart'
export { default as StackedBarChart } from './StackedBarChart'
export { default as ClusteredBarChart } from './ClusteredBarChart'
export { default as PieChart } from './PieChart'
export { default as DoughnutChart } from './DoughnutChart'
export { default as LineChart } from './LineChart'
export { default as AreaChart } from './AreaChart'
export { default as GaugeChart } from './GaugeChart'
export { default as BubbleChart } from './BubbleChart'
export { default as SparklineChart } from './SparklineChart'
export { default as HeatmapChart } from './HeatmapChart'

// Factory (renders any chart by type)
export { default as ChartFactory } from './ChartFactory'

// Optional card wrapper
export { default as ChartCard } from './ChartCard'

// Types
export type { BaseChartProps, PieDataPoint, MultiSeriesItem, BubbleDataPoint, BubbleSeriesItem, ChartType } from './types'
export type { ChartFactoryProps } from './ChartFactory'

// Utilities (export for advanced usage)
export { CHART_COLORS, getChartColor, useChartColors } from './utils/chartColors'
export { calculatePercentages, calculateMultiSeriesPercentages, interpolateColor, formatWithPercentage } from './utils/chartHelpers'

export { getContrastColor } from './utils/contrastColor'

// Legend toggle primitives
export { default as ChartLegend } from './ChartLegend'
export type { ChartLegendItem, ChartLegendProps } from './ChartLegend'
export { useSeriesToggle } from './hooks/useSeriesToggle'
export type { UseSeriesToggleResult } from './hooks/useSeriesToggle'

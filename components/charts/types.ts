export interface BaseChartProps {
  height?: number
  colors?: string[]
  showLegend?: boolean
  /**
   * Auto-calculate percentages from data values using the Largest Remainder Method.
   * Guaranteed to sum to exactly 100%.
   * For multi-series: percentages are relative to the grand total across all series.
   */
  percentage?: boolean
  /**
   * Manually provide percentage values — takes priority over `percentage`.
   * For single-series: one value per data point.
   * For multi-series: flattened array in series order.
   */
  percentageData?: number[]
}

/** Single data point for Pie / Doughnut charts */
export interface PieDataPoint {
  label: string
  value: number
}

/** A named series with an array of numeric values */
export interface MultiSeriesItem {
  label: string
  data: number[]
}

/** Data point for Bubble / Scatter charts (z encodes bubble size) */
export interface BubbleDataPoint {
  x: number
  y: number
  z: number
}

/** A named series for Bubble charts */
export interface BubbleSeriesItem {
  label: string
  data: BubbleDataPoint[]
}

/** Supported chart type strings for the ChartFactory */
export type ChartType =
  | 'Bar'
  | 'HorizontalBar'
  | 'StackedBar'
  | 'ClusteredBar'
  | 'Pie'
  | 'Doughnut'
  | 'Line'
  | 'Area'
  | 'Gauge'
  | 'Bubble'
  | 'Sparkline'
  | 'Heatmap'

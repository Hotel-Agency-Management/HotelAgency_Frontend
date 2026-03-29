# Charts Documentation

All chart components live in `components/charts/` and use **MUI X Charts v8** (`@mui/x-charts`), which is already installed.
Import from the barrel:

```tsx
import { BarChart, DoughnutChart, ChartFactory, ChartCard } from '@/components/charts'
```

Or import individual components for better tree-shaking:

```tsx
import BarChart from '@/components/charts/BarChart'
```

---

## Color Palette

Charts use an 8-color palette derived from the project's brand theme. Colors are automatically theme-aware (dark / light mode).

| # | Color | Source |
|---|-------|--------|
| 1 | `#f97316` — Orange | `primary.main` (brand) |
| 2 | `#00D0FF` — Cyan | `secondary.main` |
| 3 | `#11C28B` — Green | `success.main` |
| 4 | `#55ADFF` — Blue | `info.main` |
| 5 | `#FFB703` — Yellow | `warning.main` |
| 6 | `#8B5CF6` — Purple | `customColors.planAvatar` |
| 7 | `#FF4D4F` — Red | `error.main` |
| 8 | `#27AAE1` — Aqua | `customColors.lightAqua` |

Override with the `colors` prop on any chart:

```tsx
<BarChart data={data} labels={labels} colors={['#e91e63', '#9c27b0']} />
```

---

## Highlight & Tooltip Behaviour

Every MUI X Charts component in this library uses `highlightScope`:

- **Bar, Pie, Doughnut, Line, Area, Bubble**: `{ highlight: 'item', fade: 'global' }` — hovered item glows; all others dim.
- **Stacked Bar**: `{ highlight: 'series', fade: 'global' }` — the entire hovered series is highlighted.

Tooltips are shown automatically by MUI X Charts on hover.

---

## Percentage Feature

All charts (except Heatmap and Sparkline) support two props for percentage display:

| Prop | Type | Behaviour |
|------|------|-----------|
| `percentage` | `boolean` | Auto-calculates each item's share using the **Largest Remainder Method** (always sums to exactly 100%). |
| `percentageData` | `number[]` | Use your own pre-calculated percentages — bypasses auto-calc entirely. |

**Single-series charts** (Bar, HorizontalBar, Pie, Doughnut):
Percentages are relative to the sum of that series.

**Multi-series charts** (StackedBar, ClusteredBar, Line, Area, Bubble):
`percentage=true` shows each value as a share of the **grand total** across all series combined.
`percentageData` is a flat array: `[series0val0, series0val1, ..., seriesNvalM]`.

```tsx
// Auto-calculate
<PieChart data={slices} percentage />

// Manual override
<PieChart data={slices} percentageData={[45, 30, 15, 10]} />
```

---

## ChartCard (Optional Wrapper)

A simple MUI `Card` that wraps chart components with a title and padding.

```tsx
import ChartCard from '@/components/charts/ChartCard'

<ChartCard title="Monthly Revenue">
  <BarChart data={revenue} labels={months} />
</ChartCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Text rendered as `Typography` above the chart |
| `padding` | `number` | `3` | MUI spacing applied to `CardContent` |
| `children` | `ReactNode` | required | The chart component |

---

## StatCard (KPI Card)

A ready-made KPI card that combines a title, large metric value, a color-coded change badge (up/down arrow + percentage), a subtitle line, and an embedded `SparklineChart` — all in a single outlined MUI `Card`.

```tsx
import StatCard from '@/components/charts/StatCard'

<StatCard
  title="New Subscriptions"
  value={22}
  change={15}
  data={[5, 8, 6, 9, 12, 10, 14, 16, 18, 22]}
/>
```

Negative `change` automatically switches the badge color to `error.main` and flips the arrow icon:

```tsx
<StatCard
  title="New Orders"
  value={320}
  change={-4}
  data={[280, 310, 340, 330, 350, 360, 355, 340, 325, 320]}
  colors={['#ff6b35']}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Card heading |
| `value` | `string \| number` | required | Primary metric displayed in large text |
| `change` | `number` | required | Percentage change. Positive → green badge + up arrow; negative → red badge + down arrow |
| `subtitle` | `string` | `'compared to last week'` | Small caption below the value |
| `data` | `number[]` | required | Sparkline data points |
| `color` | `string` | first brand color | Override sparkline + badge accent color |
| `colors` | `string[]` | brand palette | Override full color palette (uses index 0) |
| `area` | `boolean` | `true` | Fill area below the sparkline |

The card uses `height: '100%'` so it stretches to match sibling cards in a Grid row automatically.

---

## ChartFactory

Renders any chart by passing a `type` prop. TypeScript narrows the remaining props automatically.

```tsx
import ChartFactory from '@/components/charts/ChartFactory'

<ChartFactory type="Bar" data={[10, 30, 20]} labels={['A', 'B', 'C']} />
<ChartFactory type="Doughnut" data={slices} percentage showLegend />
<ChartFactory type="Gauge" value={78} unit="%" />
```

### Supported `type` values

| Type | Renders |
|------|---------|
| `'Bar'` | Vertical bar chart |
| `'HorizontalBar'` | Horizontal bar chart |
| `'StackedBar'` | Stacked bar chart |
| `'ClusteredBar'` | Grouped (clustered) bar chart |
| `'Pie'` | Pie chart |
| `'Doughnut'` | Doughnut chart |
| `'Line'` | Line chart |
| `'Area'` | Area chart |
| `'Gauge'` | Gauge / speedometer |
| `'Bubble'` | Bubble / scatter chart |
| `'Sparkline'` | Compact sparkline |
| `'Heatmap'` | Grid heatmap |

---

## Bar Chart

**Component:** `BarChart`
**Import:** `@/components/charts/BarChart`

Vertical single-series bar chart.

```tsx
<BarChart
  data={[42, 58, 51, 73, 65, 89]}
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  percentage
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `number[]` | required | Bar values |
| `labels` | `string[]` | required | X-axis category labels |
| `color` | `string` | first brand color | Override the series color |
| `borderRadius` | `number` | `8` | Corner radius of bars (px) |
| `height` | `number` | `300` | Chart height (px) |
| `colors` | `string[]` | brand palette | Override full color palette |
| `showLegend` | `boolean` | `false` | Show / hide legend |
| `percentage` | `boolean` | `false` | Show auto-calculated % in tooltip |
| `percentageData` | `number[]` | — | Manual percentage values |

---

## Horizontal Bar Chart

**Component:** `HorizontalBarChart`
**Import:** `@/components/charts/HorizontalBarChart`

Same API as `BarChart` but with `labels` on the **y-axis** and bars extending horizontally.

```tsx
<HorizontalBarChart
  data={[24, 40, 12, 18, 30]}
  labels={['Sales', 'Eng', 'Design', 'Marketing', 'Support']}
  percentage
/>
```

Props are identical to `BarChart`.

---

## Stacked Bar Chart

**Component:** `StackedBarChart`
**Import:** `@/components/charts/StackedBarChart`

Multiple series stacked vertically per category.

```tsx
<StackedBarChart
  series={[
    { label: 'Online',   data: [30, 40, 35, 55] },
    { label: 'In-Store', data: [12, 18, 16, 18] },
  ]}
  labels={['Jan', 'Feb', 'Mar', 'Apr']}
  showLegend
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `series` | `{ label: string; data: number[] }[]` | required | Named series |
| `labels` | `string[]` | required | X-axis category labels |
| `borderRadius` | `number` | `4` | Corner radius of bars |
| `height` | `number` | `300` | Chart height |
| `showLegend` | `boolean` | `true` | Show legend |
| `percentage` | `boolean` | `false` | Show % of grand total in tooltip |
| `percentageData` | `number[]` | — | Flat manual percentage array |

---

## Clustered Bar Chart

**Component:** `ClusteredBarChart`
**Import:** `@/components/charts/ClusteredBarChart`

Multiple series rendered side-by-side (grouped) per category.

```tsx
<ClusteredBarChart
  series={[
    { label: 'Q1', data: [20, 35, 28] },
    { label: 'Q2', data: [30, 28, 22] },
    { label: 'Q3', data: [18, 25, 30] },
  ]}
  labels={['Mon', 'Tue', 'Wed']}
  showLegend
/>
```

Props are identical to `StackedBarChart` (minus `borderRadius` default: `6`).

---

## Pie Chart

**Component:** `PieChart`
**Import:** `@/components/charts/PieChart`

```tsx
<PieChart
  data={[
    { label: 'Direct',   value: 45 },
    { label: 'Organic',  value: 30 },
    { label: 'Referral', value: 15 },
    { label: 'Social',   value: 10 },
  ]}
  percentage
  showLegend
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `{ label: string; value: number }[]` | required | Slice definitions |
| `height` | `number` | `300` | Chart height |
| `colors` | `string[]` | brand palette | Override slice colors |
| `showLegend` | `boolean` | `true` | Show legend |
| `percentage` | `boolean` | `false` | Show % in labels and tooltip |
| `percentageData` | `number[]` | — | Manual percentage per slice |

---

## Doughnut Chart

**Component:** `DoughnutChart`
**Import:** `@/components/charts/DoughnutChart`

Same as `PieChart` with a hollow center and rounded arc ends.

```tsx
<DoughnutChart
  data={slices}
  innerRadius={70}
  cornerRadius={10}
  percentage
  showLegend
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `{ label: string; value: number }[]` | required | Slice definitions |
| `innerRadius` | `number` | `60` | Radius of the center hole (px) |
| `outerRadius` | `number` | `100` | Outer radius (px) |
| `cornerRadius` | `number` | `8` | Arc end rounding |
| `paddingAngle` | `number` | `2` | Gap between slices (degrees) |
| `percentage` | `boolean` | `false` | Show % in labels and tooltip |
| `percentageData` | `number[]` | — | Manual percentages |

---

## Line Chart

**Component:** `LineChart`
**Import:** `@/components/charts/LineChart`

```tsx
<LineChart
  series={[
    { label: 'Online',   data: [30, 40, 35, 55, 48, 72] },
    { label: 'In-Store', data: [12, 18, 16, 18, 17, 17] },
  ]}
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  showLegend
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `series` | `{ label: string; data: number[] }[]` | required | Named series |
| `labels` | `string[]` | required | X-axis labels |
| `height` | `number` | `300` | Chart height |
| `showLegend` | `boolean` | `true` | Show legend |
| `percentage` | `boolean` | `false` | Show % of grand total |
| `percentageData` | `number[]` | — | Manual flat array |

---

## Area Chart

**Component:** `AreaChart`
**Import:** `@/components/charts/AreaChart`

Same API as `LineChart`. Lines are filled underneath with a semi-transparent color. Point markers are hidden by default.

```tsx
<AreaChart series={salesSeries} labels={months} showLegend />
```

---

## Gauge Chart

**Component:** `GaugeChart`
**Import:** `@/components/charts/GaugeChart`

```tsx
<GaugeChart value={78} unit="%" />
<GaugeChart value={240} valueMax={500} unit="ms" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | Current value |
| `valueMin` | `number` | `0` | Minimum of the range |
| `valueMax` | `number` | `100` | Maximum of the range |
| `startAngle` | `number` | `-110` | Arc start angle (degrees) |
| `endAngle` | `number` | `110` | Arc end angle (degrees) |
| `unit` | `string` | — | Unit appended to the value (e.g. `%`, `ms`) |
| `height` | `number` | `240` | Chart height |

---

## Bubble Chart

**Component:** `BubbleChart`
**Import:** `@/components/charts/BubbleChart`

A scatter plot where each point's size is proportional to its `z` value.

```tsx
<BubbleChart
  xLabel="Conversions"
  yLabel="Revenue ($k)"
  series={[
    {
      label: 'Campaign A',
      data: [
        { x: 120, y: 42, z: 800 },
        { x: 200, y: 65, z: 1400 },
      ],
    },
  ]}
  showLegend
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `series` | `{ label: string; data: { x, y, z }[] }[]` | required | Named series with 3D data |
| `xLabel` | `string` | — | X-axis label |
| `yLabel` | `string` | — | Y-axis label |
| `sizeScale` | `number` | `1` | Multiplier for bubble sizes |
| `height` | `number` | `300` | Chart height |
| `showLegend` | `boolean` | `true` | Show legend |
| `percentage` | `boolean` | `false` | Show z as % of grand total z |

---

## Sparkline Chart

**Component:** `SparklineChart`
**Import:** `@/components/charts/SparklineChart`

Compact inline chart — no axes, no legend. Great for KPI cards and table cells.

```tsx
<SparklineChart data={[320, 480, 390, 540, 410, 600]} area />
<SparklineChart type="bar" data={[12, 8, 19, 5, 14, 22, 17]} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `number[]` | required | Values to plot |
| `type` | `'line' \| 'bar'` | `'line'` | Chart variant |
| `height` | `number` | `60` | Chart height |
| `showMark` | `boolean` | `false` | Show data point markers (line only) |
| `area` | `boolean` | `false` | Fill area below line |
| `color` | `string` | first brand color | Single color override |
| `curve` | `'linear' \| 'natural' \| 'monotoneX' \| 'step'` | `'linear'` | Line curve shape |

---

## Heatmap Chart

**Component:** `HeatmapChart`
**Import:** `@/components/charts/HeatmapChart`

Custom grid-based heatmap (MUI X Charts has no native heatmap). Colors interpolate from `minColor` to `maxColor` based on cell value.

```tsx
<HeatmapChart
  data={[
    [8, 3, 5, 10],
    [4, 9, 6, 3],
    [6, 2, 9, 7],
  ]}
  rowLabels={['Team A', 'Team B', 'Team C']}
  colLabels={['Q1', 'Q2', 'Q3', 'Q4']}
  cellSize={56}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `number[][]` | required | 2D value matrix (`data[row][col]`) |
| `rowLabels` | `string[]` | required | Y-axis labels |
| `colLabels` | `string[]` | required | X-axis labels |
| `cellSize` | `number` | `40` | Cell width and height (px) |
| `gap` | `number` | `4` | Gap between cells (px) |
| `minColor` | `string` | `'#fff7ed'` | Color for lowest value (brand[50]) |
| `maxColor` | `string` | `'#c2410c'` | Color for highest value (brand[700]) |
| `showValues` | `boolean` | `true` if cellSize ≥ 40 | Show numeric value inside each cell |
| `title` | `string` | — | Chart title |

Hover a cell to see its label and value in a MUI Tooltip.
The component is keyboard-navigable and uses `role="grid"` for accessibility.

---

## Advanced: Using Utilities Directly

```tsx
import {
  CHART_COLORS,
  getChartColor,
  useChartColors,
  calculatePercentages,
  calculateMultiSeriesPercentages,
  interpolateColor,
} from '@/components/charts'

// Static color access
const color = getChartColor(2) // '#11C28B'

// Theme-aware hook (inside a component)
const colors = useChartColors()

// Percentage calculation
const pcts = calculatePercentages([30, 50, 20]) // [30, 50, 20]

// Color interpolation (for custom gradients)
const mid = interpolateColor('#fff7ed', '#c2410c', 0.5) // rgb(...)
```

---

## Demo Page

A live showcase of all chart types is available at `/dashboard/charts` (any authenticated user).
Use it as a visual reference and copy-paste starting point.

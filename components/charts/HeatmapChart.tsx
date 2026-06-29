'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { darken, lighten, useTheme } from '@mui/material/styles'
import { interpolateColor } from './utils/chartHelpers'
import { getContrastColor } from './utils/contrastColor'

export interface HeatmapChartProps {
  data: number[][]
  rowLabels: readonly string[]
  colLabels: string[]
  cellSize?: number
  gap?: number
  /** Override the 5-stop color scale. Provide exactly 5 colors (low → high). */
  colorScale?: [string, string, string, string, string]
  showValues?: boolean
  title?: string
  tooltipLabels?: string[][]
  maskedCells?: boolean[][]
}

export default function HeatmapChart({
  data,
  rowLabels,
  colLabels,
  cellSize = 40,
  gap = 4,
  colorScale: colorScaleProp,
  showValues,
  title,
  tooltipLabels,
  maskedCells,
}: HeatmapChartProps) {
  const theme = useTheme()

  // 5-stop scale: mode-aware so both light and dark themes look good
  const isDark = theme.palette.mode === 'dark'
  const colorScale: string[] = colorScaleProp ?? (isDark
    ? [
        darken(theme.palette.primary.dark, 0.55),    // 1 — very dark tint (barely active)
        darken(theme.palette.primary.dark, 0.25),    // 2 — dark
        theme.palette.primary.dark,                   // 3 — mid
        theme.palette.primary.main,                   // 4 — vivid
        lighten(theme.palette.primary.main, 0.30),   // 5 — brightest (high value)
      ]
    : [
        lighten(theme.palette.primary.main, 0.88),   // 1 — near-background
        lighten(theme.palette.primary.main, 0.55),   // 2 — light tint
        theme.palette.primary.main,                   // 3 — base
        darken(theme.palette.primary.main, 0.28),    // 4 — dark
        darken(theme.palette.primary.dark, 0.38),    // 5 — darkest
      ]
  )

  /** Maps a 0–1 ratio to a color across the 5-stop scale. */
  const scaleColor = (ratio: number): string => {
    const clamped = Math.min(Math.max(ratio, 0), 1)
    const segments = colorScale.length - 1
    const scaled = clamped * segments
    const lo = Math.min(Math.floor(scaled), segments - 1)
    return interpolateColor(colorScale[lo], colorScale[lo + 1], scaled - lo)
  }

  const allValues = data.flat()
  const min = Math.min(...allValues)
  const max = Math.max(...allValues)
  const range = max - min || 1

  const displayValues = showValues ?? cellSize >= 40

  const colLabelStyle = {
    fontSize: 12,
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  const rowLabelStyle = {
    fontSize: 12,
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap' as const,
  }

  // Build legend bands using floor/ceil so every band always shows a range (e.g. "0–1", "2–3")
  const legendBands = colorScale.map((color, i) => {
    const lo = Math.floor(min + (i / colorScale.length) * range)
    const hi = i === colorScale.length - 1
      ? max
      : Math.ceil(min + ((i + 1) / colorScale.length) * range) - 1
    const label = lo >= hi ? `${lo}` : `${lo}–${hi}`
    return { color, label }
  })

  return (
    <Box dir='ltr' style={{ direction: 'ltr' }} sx={{ width: '100%', overflowX: 'auto' }}>
      {title && (
        <Typography variant='subtitle1' fontWeight={600} mb={2}>
          {title}
        </Typography>
      )}

      {/* CSS Grid: first column auto-sizes to fit any label length */}
      <Box
          role='grid'
          aria-label={title ?? 'Heatmap'}
          aria-rowcount={rowLabels.length}
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: `max-content repeat(${colLabels.length}, 1fr)`,
            columnGap: `${gap}px`,
            rowGap: `${gap}px`,
          }}
      >
        {/* Header row */}
        <Box />
        {colLabels.map(col => (
          <Box key={`col-${col}`} sx={{ textAlign: 'center', ...colLabelStyle }}>
            {col}
          </Box>
        ))}

        {/* Data rows */}
        {data.map((row, ri) => [
          <Box
            key={`label-${ri}`}
            sx={{
              alignSelf: 'center',
              textAlign: 'end',
              paddingInlineEnd: `${gap}px`,
              ...rowLabelStyle,
            }}
          >
            {rowLabels[ri]}
          </Box>,

          ...row.map((value, ci) => {
            if (maskedCells?.[ri]?.[ci]) {
              return (
                <Box
                  key={`${ri}-${ci}`}
                  role='gridcell'
                  aria-hidden='true'
                  sx={{ height: cellSize, visibility: 'hidden' }}
                />
              )
            }

            const ratio = (value - min) / range
            const bgColor = scaleColor(ratio)
            const textColor = getContrastColor(bgColor)

            return (
              <Tooltip
                key={`${ri}-${ci}`}
                title={tooltipLabels?.[ri]?.[ci] ?? `${rowLabels[ri]} / ${colLabels[ci]}: ${value}`}
                placement='top'
                arrow
              >
                <Box
                  role='gridcell'
                  aria-label={`${rowLabels[ri]}, ${colLabels[ci]}: ${value}`}
                  tabIndex={0}
                  sx={{
                    height: cellSize,
                    borderRadius: 1,
                    backgroundColor: bgColor,
                    border: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'default',
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: theme.shadows[4],
                      zIndex: 1,
                      position: 'relative',
                    },
                    '&:focus-visible': {
                      outline: `2px solid ${theme.palette.primary.main}`,
                      outlineOffset: 2,
                    },
                  }}
                >
                  {displayValues && (
                    <Typography
                      variant='caption'
                      sx={{
                        color: textColor,
                        fontWeight: 600,
                        lineHeight: 1,
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                    >
                      {value}
                    </Typography>
                  )}
                </Box>
              </Tooltip>
            )
          }),
        ])}
      </Box>

      {/* Bottom-right horizontal legend */}
      <Stack direction='row' justifyContent='flex-end' alignItems='center' gap={1} mt={1.5} flexWrap='wrap'>
        <Typography variant='caption' color='text.disabled'>
          Less
        </Typography>
        {legendBands.map(({ color, label }, i) => (
          <Stack key={i} direction='row' alignItems='center' gap={0.5}>
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: 0.5,
                backgroundColor: color,
                flexShrink: 0,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Typography variant='caption' color='text.secondary' noWrap>
              {label}
            </Typography>
          </Stack>
        ))}
        <Typography variant='caption' color='text.disabled'>
          More
        </Typography>
      </Stack>
    </Box>
  )
}

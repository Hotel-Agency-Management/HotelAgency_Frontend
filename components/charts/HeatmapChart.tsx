'use client'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { interpolateColor } from './utils/chartHelpers'
import { getContrastColor } from './utils/contrastColor'

export interface HeatmapChartProps {
  /**
   * 2D matrix of numeric values.
   * `data[row][col]` — rows map to `rowLabels`, columns map to `colLabels`.
   */
  data: number[][]
  /** Labels for each row (y-axis) */
  rowLabels: string[]
  /** Labels for each column (x-axis) */
  colLabels: string[]
  /** Cell size in px (default: 40) */
  cellSize?: number
  /** Gap between cells in px (default: 4) */
  gap?: number
  /**
   * Color used for the minimum value (default: '#fff7ed' — brand[50]).
   * Override to customize the low end of the gradient.
   */
  minColor?: string
  /**
   * Color used for the maximum value (default: '#c2410c' — brand[700]).
   * Override to customize the high end of the gradient.
   */
  maxColor?: string
  /** Show numeric values inside each cell (default: true for cells ≥ 40px) */
  showValues?: boolean
  /** Optional chart title */
  title?: string
}

/**
 * Heatmap chart — a grid where each cell's background color encodes its value.
 *
 * Built with MUI Box components (MUI X Charts has no native heatmap).
 * Color interpolates from `minColor` (low) to `maxColor` (high) using the brand palette.
 * Hover a cell to see its row, column, and value in a MUI Tooltip.
 *
 * Accessible: uses `role="grid"` with appropriate ARIA labels.
 */
export default function HeatmapChart({
  data,
  rowLabels,
  colLabels,
  cellSize = 40,
  gap = 4,
  minColor = '#fff7ed',
  maxColor = '#c2410c',
  showValues,
  title
}: HeatmapChartProps) {
  const theme = useTheme()

  const allValues = data.flat()
  const min = Math.min(...allValues)
  const max = Math.max(...allValues)
  const range = max - min || 1

  const displayValues = showValues ?? cellSize >= 40

  const labelStyle = {
    fontSize: 12,
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {title && (
        <Typography variant='subtitle1' fontWeight={600} mb={2}>
          {title}
        </Typography>
      )}

      <Box sx={{ display: 'inline-block', minWidth: 'max-content' }}>
        {/* Column labels */}
        <Box sx={{ display: 'flex', ml: `${cellSize + gap + 8}px`, mb: `${gap}px` }}>
          {colLabels.map(col => (
            <Box
              key={col}
              sx={{
                width: cellSize,
                mr: `${gap}px`,
                textAlign: 'center',
                ...labelStyle
              }}
            >
              {col}
            </Box>
          ))}
        </Box>

        {/* Grid rows */}
        <Box role='grid' aria-label={title ?? 'Heatmap'} aria-rowcount={rowLabels.length}>
          {data.map((row, ri) => (
            <Box key={rowLabels[ri]} role='row' sx={{ display: 'flex', alignItems: 'center', mb: `${gap}px` }}>
              {/* Row label */}
              <Box
                sx={{
                  width: cellSize,
                  mr: 1,
                  textAlign: 'right',
                  flexShrink: 0,
                  ...labelStyle
                }}
              >
                {rowLabels[ri]}
              </Box>

              {/* Cells */}
              {row.map((value, ci) => {
                const ratio = (value - min) / range
                const bgColor = interpolateColor(minColor, maxColor, ratio)
                // Use dark text on light backgrounds, light text on dark
                const textColor = getContrastColor(bgColor)

                return (
                  <Tooltip
                    key={`${ri}-${ci}`}
                    title={`${rowLabels[ri]} / ${colLabels[ci]}: ${value}`}
                    placement='top'
                    arrow
                  >
                    <Box
                      role='gridcell'
                      aria-label={`${rowLabels[ri]}, ${colLabels[ci]}: ${value}`}
                      tabIndex={0}
                      sx={{
                        width: cellSize,
                        height: cellSize,
                        mr: `${gap}px`,
                        borderRadius: 1,
                        backgroundColor: bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'default',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: theme.shadows[4],
                          zIndex: 1,
                          position: 'relative'
                        },
                        '&:focus-visible': {
                          outline: `2px solid ${theme.palette.primary.main}`,
                          outlineOffset: 2
                        }
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
                            pointerEvents: 'none'
                          }}
                        >
                          {value}
                        </Typography>
                      )}
                    </Box>
                  </Tooltip>
                )
              })}
            </Box>
          ))}
        </Box>

        {/* Color legend */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, ml: `${cellSize + gap + 8}px` }}>
          <Typography variant='caption' color='text.secondary' mr={1}>
            {min}
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: 8,
              borderRadius: 1,
              background: `linear-gradient(to right, ${minColor}, ${maxColor})`,
              maxWidth: colLabels.length * (cellSize + gap)
            }}
          />
          <Typography variant='caption' color='text.secondary' ml={1}>
            {max}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

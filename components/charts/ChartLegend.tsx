'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export interface ChartLegendItem {
  label: string
  color: string
}

export interface ChartLegendProps {
  items: ChartLegendItem[]
  hiddenLabels: Set<string>
  onToggle: (label: string) => void
}

/**
 * Interactive chart legend.
 *
 * Single responsibility: renders clickable legend items and delegates
 * all state management to the parent via `onToggle`.
 *
 * Clicking an item toggles its visibility:
 * - Visible  → colored dot, normal text
 * - Hidden   → outlined dot, dimmed + strikethrough text
 */
export default function ChartLegend({ items, hiddenLabels, onToggle }: ChartLegendProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mb: 2,
        px: 1
      }}
    >
      {items.map(({ label, color }) => {
        const hidden = hiddenLabels.has(label)

        return (
          <Box
            key={label}
            onClick={() => onToggle(label)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'opacity 0.2s ease',
              opacity: hidden ? 0.45 : 1,
              '&:hover': { opacity: hidden ? 0.65 : 0.8 }
            }}
          >
            {/* Color swatch */}
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                flexShrink: 0,
                transition: 'background-color 0.2s ease, border 0.2s ease',
                ...(hidden
                  ? { backgroundColor: 'transparent', border: `2px solid ${color}` }
                  : { backgroundColor: color, border: `2px solid ${color}` })
              }}
            />

            {/* Label */}
            <Typography
              variant='caption'
              sx={{
                fontWeight: 500,
                lineHeight: 1,
                transition: 'text-decoration 0.15s ease',
                textDecoration: hidden ? 'line-through' : 'none'
              }}
            >
              {label}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

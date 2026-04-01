import type { Theme } from '@mui/material/styles'

/**
 * Safely computes a border-radius multiple from the MUI theme.
 * theme.shape.borderRadius can be string | number — this coerces it to number
 * so TypeScript is happy with arithmetic operations.
 */
export function br(theme: Theme, multiplier = 1): number {
  return Number(theme.shape.borderRadius) * multiplier
}

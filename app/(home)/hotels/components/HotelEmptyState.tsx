'use client'

import { Button, Paper, Stack, Typography } from '@mui/material'

interface HotelEmptyStateProps {
  onReset: () => void
}

export function HotelEmptyState({ onReset }: HotelEmptyStateProps) {
  return (
    <Paper variant="customerHotelEmpty">
      <Stack spacing={3} alignItems="center">
        <Stack spacing={1}>
          <Typography variant="h5">
            No hotels match this search.
          </Typography>
          <Typography variant="body2">
            Try another destination, budget, or hotel name.
          </Typography>
        </Stack>
        <Button variant="outlined" onClick={onReset}>
          Reset filters
        </Button>
      </Stack>
    </Paper>
  )
}

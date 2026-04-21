'use client'

import { Button, Paper, Stack, Typography } from '@mui/material'

interface HotelRoomsSectionEmptyProps {
  onResetFilters: () => void
}

export function HotelRoomsSectionEmpty({ onResetFilters }: HotelRoomsSectionEmptyProps) {
  return (
    <Paper variant="customerHotelRoomEmpty">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5">No rooms match this search</Typography>
        <Typography color="text.secondary">
          Try different dates, guest count, room type, or price range.
        </Typography>
        <Button variant="outlined" onClick={onResetFilters}>
          Reset search
        </Button>
      </Stack>
    </Paper>
  )
}

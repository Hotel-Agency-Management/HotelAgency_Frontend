'use client'

import { Stack, Typography } from '@mui/material'

interface HotelRoomsSectionHeaderProps {
  roomsCount: number
  totalRooms: number
}

export function HotelRoomsSectionHeader({
  roomsCount,
  totalRooms,
}: HotelRoomsSectionHeaderProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between">
      <Stack spacing={0.5}>
        <Typography variant="overline">Available stays</Typography>
        <Typography variant="h4">Choose your room</Typography>
      </Stack>
      <Typography color="text.secondary">
        {roomsCount} of {totalRooms} rooms match your search
      </Typography>
    </Stack>
  )
}

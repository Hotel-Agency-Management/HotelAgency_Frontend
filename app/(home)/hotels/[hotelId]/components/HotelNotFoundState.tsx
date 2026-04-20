'use client'

import { Button, Paper, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export function HotelNotFoundState() {
  const router = useRouter()

  return (
    <Paper variant="customerHotelRoomEmpty">
      <Stack spacing={2} alignItems="center">
        <Typography variant="h4">Hotel not found</Typography>
        <Typography color="text.secondary">
          The hotel may be unavailable or the link is no longer valid.
        </Typography>
        <Button variant="contained" onClick={() => router.push('/hotels')}>
          Browse hotels
        </Button>
      </Stack>
    </Paper>
  )
}

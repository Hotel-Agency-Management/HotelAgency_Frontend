'use client'

import { Grid, Paper, Skeleton, Stack } from '@mui/material'

export function HotelRoomsSectionLoading() {
  return (
    <Grid container spacing={2.5}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, md: 4 }}>
          <Paper variant="customerHotelSkeleton">
            <Stack spacing={2}>
              <Skeleton variant="rounded" height={210} />
              <Skeleton variant="rounded" height={28} />
              <Skeleton variant="rounded" height={20} />
              <Skeleton variant="rounded" height={44} />
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

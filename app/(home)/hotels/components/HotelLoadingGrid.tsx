'use client'

import Grid from '@mui/material/Grid'
import { Paper, Skeleton, Stack } from '@mui/material'

export function HotelLoadingGrid() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Paper variant="customerHotelSkeleton">
            <Stack spacing={2}>
              <Skeleton variant="rounded" height={220} />
              <Skeleton width="70%" />
              <Skeleton width="45%" />
              <Skeleton width="90%" />
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

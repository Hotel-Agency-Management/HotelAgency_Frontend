'use client'

import { Paper, Stack, Typography } from '@mui/material'
import { TypewriterText } from '@/components/animation'
import { heroStyle } from '../constants/hotelFilters'


export function HotelsHero() {
  return (
    <Paper
      elevation={0}
      variant="customerHotelHero"
      style={heroStyle}
    >
      <Stack
        spacing={2}
      >
        <Typography variant="overline">
          Worldwide stays
        </Typography>
        <TypewriterText variant="h1" text="Your next hotel starts anywhere." />
        <Typography>
          Compare verified hotels from every partner agency in one place.
        </Typography>
      </Stack>
    </Paper>
  )
}

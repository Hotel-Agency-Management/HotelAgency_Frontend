'use client'

import Grid from '@mui/material/Grid'
import FadeIn from '@/components/animation/FadeIn'
import type { CustomerHotel } from '../types/customerHotel'
import { HotelCard } from './HotelCard'

interface HotelGridProps {
  hotels: CustomerHotel[]
}

export function HotelGrid({ hotels }: HotelGridProps) {
  return (
    <Grid container spacing={3}>
      {hotels.map((hotel, index) => (
        <Grid key={`${hotel.agencyId ?? 'global'}-${hotel.id}`} size={{ xs: 12, sm: 6, lg: 4 }}>
          <FadeIn direction="up" distance={20} transition={{ delay: index * 0.04 }}>
            <HotelCard hotel={hotel} />
          </FadeIn>
        </Grid>
      ))}
    </Grid>
  )
}

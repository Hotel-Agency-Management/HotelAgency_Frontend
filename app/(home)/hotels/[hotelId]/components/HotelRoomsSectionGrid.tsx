'use client'

import { Grid } from '@mui/material'
import type { PublicRoom } from '@/app/(home)/hotels/types/customerRoom'
import FadeIn from '@/components/animation/FadeIn'
import { getPublicRoomId, getPublicRoomTypeName } from '../utils/publicRoomFields'
import { CustomerRoomCard } from './CustomerRoomCard'

interface HotelRoomsSectionGridProps {
  rooms: PublicRoom[]
  currency: string
  onRoomClick: (roomId: string) => void
}

export function HotelRoomsSectionGrid({
  rooms,
  currency,
  onRoomClick,
}: HotelRoomsSectionGridProps) {
  return (
    <Grid container spacing={2.5}>
      {rooms.map((room, index) => (
        <Grid key={getPublicRoomId(room)} size={{ xs: 12, md: 6, lg: 4 }}>
          <FadeIn direction="up" distance={18} transition={{ delay: index * 0.04 }}>
            <CustomerRoomCard
              room={room}
              roomTypeName={getPublicRoomTypeName(room)}
              currency={currency}
              onRoomClick={onRoomClick}
            />
          </FadeIn>
        </Grid>
      ))}
    </Grid>
  )
}

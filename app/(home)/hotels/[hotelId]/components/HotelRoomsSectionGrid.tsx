'use client'

import { Grid } from '@mui/material'
import type { Room } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import FadeIn from '@/components/animation/FadeIn'
import { CustomerRoomCard } from './CustomerRoomCard'

interface HotelRoomsSectionGridProps {
  rooms: Room[]
  currency: string
  roomTypeNameById: Map<string, string>
  onRoomClick: (roomId: string) => void
}

export function HotelRoomsSectionGrid({
  rooms,
  currency,
  roomTypeNameById,
  onRoomClick,
}: HotelRoomsSectionGridProps) {
  return (
    <Grid container spacing={2.5}>
      {rooms.map((room, index) => (
        <Grid key={room.id} size={{ xs: 12, md: 6, lg: 4 }}>
          <FadeIn direction="up" distance={18} transition={{ delay: index * 0.04 }}>
            <CustomerRoomCard
              room={room}
              roomTypeName={roomTypeNameById.get(room.roomTypeId) ?? 'Room'}
              currency={currency}
              onRoomClick={onRoomClick}
            />
          </FadeIn>
        </Grid>
      ))}
    </Grid>
  )
}

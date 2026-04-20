'use client'

import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import type { Room } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import type { RoomType } from '@/app/(home)/room-types/types/roomType'
import { HotelRoomsSectionEmpty } from './HotelRoomsSectionEmpty'
import { HotelRoomsSectionGrid } from './HotelRoomsSectionGrid'
import { HotelRoomsSectionHeader } from './HotelRoomsSectionHeader'
import { HotelRoomsSectionLoading } from './HotelRoomsSectionLoading'

interface HotelRoomsSectionProps {
  rooms: Room[]
  totalRooms: number
  roomTypes: RoomType[]
  currency: string
  isLoading: boolean
  onResetFilters: () => void
}

export function HotelRoomsSection({
  rooms,
  totalRooms,
  roomTypes,
  currency,
  isLoading,
  onResetFilters,
}: HotelRoomsSectionProps) {
  const router = useRouter()
  const params = useParams<{ hotelId?: string }>()
  const hotelId = params.hotelId ? decodeURIComponent(params.hotelId) : ''
  const roomTypeNameById = new Map(roomTypes.map(roomType => [roomType.id, roomType.name]))
  const goToRoomProfile = (roomId: string) => {
    router.push(`/hotels/${hotelId}/rooms/${roomId}`)
  }

  return (
    <Stack id="available-rooms" spacing={2.5}>
      <HotelRoomsSectionHeader roomsCount={rooms.length} totalRooms={totalRooms} />

      {isLoading ? (
        <HotelRoomsSectionLoading />
      ) : rooms.length > 0 ? (
        <HotelRoomsSectionGrid
          rooms={rooms}
          currency={currency}
          roomTypeNameById={roomTypeNameById}
          onRoomClick={goToRoomProfile}
        />
      ) : (
        <HotelRoomsSectionEmpty onResetFilters={onResetFilters} />
      )}
    </Stack>
  )
}

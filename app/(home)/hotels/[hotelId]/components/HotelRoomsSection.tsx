'use client'

import { Stack } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import type { PublicRoom } from '@/app/(home)/hotels/types/customerRoom'
import type { CustomerRoomSearchFilters } from '../types/customerHotelDetails'
import { HotelRoomsSectionEmpty } from './HotelRoomsSectionEmpty'
import { HotelRoomsSectionGrid } from './HotelRoomsSectionGrid'
import { HotelRoomsSectionHeader } from './HotelRoomsSectionHeader'
import { HotelRoomsSectionLoading } from './HotelRoomsSectionLoading'

interface HotelRoomsSectionProps {
  rooms: PublicRoom[]
  totalRooms: number
  currency: string
  filters: CustomerRoomSearchFilters
  isLoading: boolean
  onResetFilters: () => void
}

export function HotelRoomsSection({
  rooms,
  totalRooms,
  currency,
  filters,
  isLoading,
  onResetFilters,
}: HotelRoomsSectionProps) {
  const router = useRouter()
  const params = useParams<{ hotelId?: string }>()
  const hotelId = params.hotelId ? decodeURIComponent(params.hotelId) : ''

  const goToRoomProfile = (roomId: string) => {
    const query = new URLSearchParams({
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
      guests: String(filters.guests),
      rooms: String(filters.rooms),
    })

    router.push(`/hotels/${hotelId}/rooms/${roomId}?${query.toString()}`)
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
          onRoomClick={goToRoomProfile}
        />
      ) : (
        <HotelRoomsSectionEmpty onResetFilters={onResetFilters} />
      )}
    </Stack>
  )
}

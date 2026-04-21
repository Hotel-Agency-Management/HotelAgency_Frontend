'use client'

import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRoomTypes } from '@/app/(home)/room-types/hooks/uesRoomType'
import { mapRoomToProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/util/mapRoomToProfile'
import { getCustomerHotelById, getCustomerHotelRoomById } from '../data/customerHotelRooms'

export const customerRoomProfileQueryKeys = {
  hotel: (hotelId: string) => ['customer-hotel', hotelId] as const,
  room: (hotelId: string, roomId: string) => ['customer-hotel-room', hotelId, roomId] as const,
}

export const useCustomerRoomProfile = (hotelId: string, roomId: string) => {
  const hotelQuery = useQuery({
    queryKey: customerRoomProfileQueryKeys.hotel(hotelId),
    queryFn: () => getCustomerHotelById(hotelId),
    enabled: hotelId.length > 0,
  })

  const roomQuery = useQuery({
    queryKey: customerRoomProfileQueryKeys.room(hotelId, roomId),
    queryFn: () => getCustomerHotelRoomById(hotelId, roomId),
    enabled: hotelId.length > 0 && roomId.length > 0,
  })

  const { data: roomTypes = [], isLoading: roomTypesLoading } = useRoomTypes()

  const profile = useMemo(() => {
    const room = roomQuery.data
    if (!room) return null

    const typeName = roomTypes.find(roomType => roomType.id === room.roomTypeId)?.name ?? ''
    return mapRoomToProfile(room, typeName)
  }, [roomQuery.data, roomTypes])

  return {
    hotel: hotelQuery.data ?? null,
    room: roomQuery.data ?? null,
    profile,
    isLoading: hotelQuery.isLoading || roomQuery.isLoading || roomTypesLoading,
    isError: hotelQuery.isError || roomQuery.isError,
  }
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { getCustomerHotelRooms } from '../data/customerHotelRooms'

export const customerHotelRoomsQueryKeys = {
  rooms: (hotelId: string) => ['customer-hotel-rooms', hotelId] as const,
}

export const useCustomerHotelRooms = (hotelId: string) =>
  useQuery({
    queryKey: customerHotelRoomsQueryKeys.rooms(hotelId),
    queryFn: () => getCustomerHotelRooms(hotelId),
    enabled: hotelId.length > 0,
  })

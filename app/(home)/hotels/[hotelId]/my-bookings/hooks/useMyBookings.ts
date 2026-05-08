'use client'

import { useQuery } from '@tanstack/react-query'
import { myBookingsApi } from '../data/myBookingsMock'

export const myBookingsQueryKeys = {
  list: (hotelId: string) => ['customer-my-bookings', hotelId] as const,
}

export const useMyBookings = (hotelId: string) => {
  const query = useQuery({
    queryKey: myBookingsQueryKeys.list(hotelId),
    queryFn: () => myBookingsApi.getMyBookings(hotelId).then(r => r.items),
    enabled: hotelId.length > 0,
  })

  return {
    bookings: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}

'use client'

import { useQuery } from '@tanstack/react-query'
import { getMyReservations } from '../client/customerReservationClient'
import { CUSTOMER_RESERVATION_QUERY_KEYS } from '../constants/queryKeys'

export const useMyBookings = (hotelId: string) => {
  const query = useQuery({
    queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.list(),
    queryFn: ({ signal }) => getMyReservations(signal),
    enabled: hotelId.length > 0,
    select: (data) => data.items,
  })

  return {
    bookings: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}

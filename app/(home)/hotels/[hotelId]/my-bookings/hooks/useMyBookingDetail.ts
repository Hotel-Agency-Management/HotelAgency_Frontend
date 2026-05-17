'use client'

import { useQuery } from '@tanstack/react-query'
import { getMyReservationById } from '../client/customerReservationClient'
import { CUSTOMER_RESERVATION_QUERY_KEYS } from '../constants/queryKeys'

export const useMyBookingDetail = (hotelId: string, reservationId: string) => {
  const query = useQuery({
    queryKey: CUSTOMER_RESERVATION_QUERY_KEYS.detail(Number(reservationId)),
    queryFn: () => getMyReservationById(Number(reservationId)),
    enabled: hotelId.length > 0 && reservationId.length > 0,
  })

  return {
    booking: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}

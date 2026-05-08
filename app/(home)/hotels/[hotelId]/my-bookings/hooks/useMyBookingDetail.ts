'use client'

import { useQuery } from '@tanstack/react-query'
import { myBookingsApi } from '../data/myBookingsMock'

export const myBookingDetailQueryKeys = {
  detail: (hotelId: string, reservationId: string) =>
    ['customer-my-booking-detail', hotelId, reservationId] as const,
}

export const useMyBookingDetail = (hotelId: string, reservationId: string) => {
  const query = useQuery({
    queryKey: myBookingDetailQueryKeys.detail(hotelId, reservationId),
    queryFn: () => myBookingsApi.getMyBookingDetail(hotelId, reservationId),
    enabled: hotelId.length > 0 && reservationId.length > 0,
  })

  return {
    booking: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}

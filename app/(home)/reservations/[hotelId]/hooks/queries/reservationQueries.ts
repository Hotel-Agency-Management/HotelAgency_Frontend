import { useQuery } from '@tanstack/react-query'
import { getReservations, getReservationById } from '../../client/directReservationClient'
import { RESERVATION_QUERY_KEYS } from '../../constants/reservationKey'
import type { ReservationListParams } from '../../config/reservationConfig'

export function useReservations(hotelId: number, params?: ReservationListParams, enabled = true) {
  return useQuery({
    queryKey: RESERVATION_QUERY_KEYS.byHotel(hotelId, params),
    queryFn: ({ signal }) => getReservations(hotelId, params, signal),
    enabled: enabled && Number.isFinite(hotelId),
    placeholderData: (prev) => prev,
  })
}

export function useReservationById(hotelId: number, reservationId: number) {
  return useQuery({
    queryKey: RESERVATION_QUERY_KEYS.detail(hotelId, reservationId),
    queryFn: () => getReservationById(hotelId, reservationId),
    enabled: Number.isFinite(hotelId) && Number.isFinite(reservationId),
  })
}

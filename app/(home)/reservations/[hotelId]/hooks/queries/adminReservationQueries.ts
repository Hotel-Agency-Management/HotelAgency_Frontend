import { useQuery } from '@tanstack/react-query'
import { getAdminReservations, getAdminReservationById } from '../../client/adminReservationClient'
import { ADMIN_RESERVATION_QUERY_KEYS } from '../../constants/reservationKey'
import type { ReservationListParams } from '../../config/reservationConfig'

export function useAdminReservations(
  agencyId: number,
  hotelId: number,
  params?: ReservationListParams,
  enabled = true
) {
  return useQuery({
    queryKey: ADMIN_RESERVATION_QUERY_KEYS.byHotel(agencyId, hotelId, params),
    queryFn: ({ signal }) => getAdminReservations(agencyId, hotelId, params, signal),
    enabled: enabled && Number.isFinite(agencyId) && Number.isFinite(hotelId),
    placeholderData: (prev) => prev,
  })
}

export function useAdminReservationById(
  agencyId: number,
  hotelId: number,
  reservationId: number
) {
  return useQuery({
    queryKey: ADMIN_RESERVATION_QUERY_KEYS.detail(agencyId, hotelId, reservationId),
    queryFn: () => getAdminReservationById(agencyId, hotelId, reservationId),
    enabled:
      Number.isFinite(agencyId) &&
      Number.isFinite(hotelId) &&
      Number.isFinite(reservationId),
  })
}

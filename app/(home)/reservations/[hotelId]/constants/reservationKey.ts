import type { ReservationListParams } from '../config/reservationConfig'

export const RESERVATION_QUERY_KEYS = {
  all: ['reservations'] as const,
  byHotelList: (hotelId: number) => ['reservations', hotelId] as const,
  byHotel: (hotelId: number, params?: ReservationListParams) =>
    ['reservations', hotelId, params] as const,
  detail: (hotelId: number, reservationId: number) =>
    ['reservations', hotelId, reservationId] as const,
}

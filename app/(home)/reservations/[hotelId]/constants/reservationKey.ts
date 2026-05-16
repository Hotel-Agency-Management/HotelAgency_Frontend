import type { ReservationListParams } from '../config/reservationConfig'

export const RESERVATION_QUERY_KEYS = {
  all: ['reservations'] as const,
  byHotelList: (hotelId: number) => ['reservations', hotelId] as const,
  byHotel: (hotelId: number, params?: ReservationListParams) =>
    ['reservations', hotelId, params] as const,
  detail: (hotelId: number, reservationId: number) =>
    ['reservations', hotelId, reservationId] as const,
}

export const ADMIN_RESERVATION_QUERY_KEYS = {
  byHotelList: (agencyId: number, hotelId: number) =>
    ['admin', 'reservations', agencyId, hotelId] as const,
  byHotel: (agencyId: number, hotelId: number, params?: ReservationListParams) =>
    ['admin', 'reservations', agencyId, hotelId, params] as const,
  detail: (agencyId: number, hotelId: number, reservationId: number) =>
    ['admin', 'reservations', agencyId, hotelId, reservationId] as const,
}

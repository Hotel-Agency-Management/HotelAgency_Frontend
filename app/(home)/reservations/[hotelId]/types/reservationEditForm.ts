import type { ReservationSource } from '../config/reservationConfig'

export type ReservationEditForm = {
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  source: ReservationSource | ''
  guestFullName: string
  guestPhone: string
  guestIdNumber: string
  hasInsurance: boolean
  specialRequests: string
  notes: string
}

export type PaginationModel = { page: number; pageSize: number }
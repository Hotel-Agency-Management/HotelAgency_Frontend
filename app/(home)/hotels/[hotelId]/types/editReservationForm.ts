import { ReservationSource } from "@/app/(home)/reservations/[hotelId]/config/reservationConfig"

export type EditReservationFieldKey =
  | 'roomId'
  | 'checkIn'
  | 'checkOut'
  | 'guests'
  | 'rooms'
  | 'source'
  | 'guestFullName'
  | 'guestPhone'
  | 'guestIdNumber'
  | 'hasInsurance'
  | 'specialRequests'
  | 'notes'

export interface EditReservationFormState {
  roomId: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  source?: ReservationSource | ''
  guestFullName?: string
  guestPhone?: string
  guestIdNumber?: string
  hasInsurance?: boolean
  specialRequests?: string
  notes?: string
}
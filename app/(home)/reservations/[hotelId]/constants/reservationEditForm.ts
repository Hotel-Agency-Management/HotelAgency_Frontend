import type { EditReservationFormState } from '@/app/(home)/hotels/[hotelId]/types/editReservationForm'

export const DEFAULT_VALUE_OF_RESERVATION_EDIT_FORM: EditReservationFormState = {
  roomId: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
  rooms: 1,
  source: '',
  guestFullName: '',
  guestPhone: '',
  guestIdNumber: '',
  hasInsurance: false,
  specialRequests: '',
  notes: '',
}

import { DirectReservationFormInput } from "../[hotelId]/schema/directReservationSchema";

export type ReservationSummarySnapshot = Pick<
  DirectReservationFormInput,
  | 'checkInDate'
  | 'checkOutDate'
  | 'numberOfGuests'
  | 'numberOfRooms'
  | 'roomType'
  | 'paymentMethod'
  | 'paidAmount'
  | 'remainingAmount'
>

export interface BuildReservationSummaryCardDataArgs {
  totalAmount: number
  snapshot: ReservationSummarySnapshot
}

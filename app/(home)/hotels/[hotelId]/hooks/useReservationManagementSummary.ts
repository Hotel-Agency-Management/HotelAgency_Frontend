import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import type { CustomerReservation } from '../types/customerReservation'
import {
  calculateCancellationFee,
  canModifyReservation,
  isFreeCancellationEligible,
} from '../utils/customerReservationPolicy'
import { getStayLength } from '../utils/roomBooking'

export function useReservationManagementSummary(
  currentReservation: CustomerReservation | null,
  room: Pick<RoomProfile, 'pricePerNight' | 'extendPrice'>,
  hotel: Pick<CustomerHotel, 'cancellationFeeRate'> | null
) {
  const canModify = currentReservation != null ? canModifyReservation(currentReservation) : false
  const freeCancellation =
    currentReservation != null ? isFreeCancellationEligible(currentReservation) : false
  const cancellationFee =
    currentReservation != null
      ? calculateCancellationFee(currentReservation, hotel?.cancellationFeeRate)
      : 0
  const stayLength =
    currentReservation != null
      ? getStayLength(currentReservation.checkIn, currentReservation.checkOut)
      : 0
  const nightlyRate =
    currentReservation?.nightlyRate && currentReservation.nightlyRate > 0
      ? currentReservation.nightlyRate
      : room.pricePerNight ?? 0
  const extendPrice =
    currentReservation?.extendPrice && currentReservation.extendPrice > 0
      ? currentReservation.extendPrice
      : room.extendPrice ?? nightlyRate

  return { canModify, freeCancellation, cancellationFee, stayLength, nightlyRate, extendPrice }
}

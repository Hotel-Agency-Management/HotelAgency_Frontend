import dayjs from 'dayjs'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import { BuildReservationSummaryCardDataArgs } from '../../types/reservationSummary'
export function buildReservationSummaryCardData({
  totalAmount,
  snapshot,
}: BuildReservationSummaryCardDataArgs) {
  const roomTypeLabel =
    snapshot.roomType && snapshot.roomType in ROOM_TYPES
      ? ROOM_TYPES[snapshot.roomType as keyof typeof ROOM_TYPES].label
      : 'Choose a room type'

  const nights =
    snapshot.checkInDate && snapshot.checkOutDate
      ? Math.max(dayjs(snapshot.checkOutDate).diff(dayjs(snapshot.checkInDate), 'day'), 0)
      : 0

  const stayLabel =
    snapshot.checkInDate && snapshot.checkOutDate
      ? `${dayjs(snapshot.checkInDate).format('DD MMM')} - ${dayjs(snapshot.checkOutDate).format(
          'DD MMM YYYY'
        )}`
      : 'Select check-in and check-out'

  const paidAmount = typeof snapshot.paidAmount === 'number' ? snapshot.paidAmount : 0

  return {
    roomTypeLabel,
    stayValue: nights > 0 ? `${stayLabel} · ${nights} night${nights > 1 ? 's' : ''}` : stayLabel,
    occupancyValue: `${snapshot.numberOfGuests || 0} guest · ${snapshot.numberOfRooms || 0} room`,
    paymentValue: snapshot.paymentMethod || 'Select payment method',
    paidAmount,
    remainingAmount: snapshot.remainingAmount,
    totalAmount,
  }
}

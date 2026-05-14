import dayjs from 'dayjs'
import type { ReservationBase } from '../config/reservationConfig'

type NumericFormValue = number | ''

export type ReservationSummarySnapshot = Pick<
  ReservationBase,
  'checkInDate' | 'checkOutDate' | 'roomNumbers'
> & {
  numberOfGuests: ReservationBase['numberOfGuests'] | ''
  source: ReservationBase['source'] | ''
  totalAmount: number
}

interface BuildReservationSummaryCardDataArgs {
  snapshot: ReservationSummarySnapshot
}

const formatAmount = (value: NumericFormValue | null | undefined) => {
  if (value === '' || value == null || !Number.isFinite(value)) {
    return '0 USD'
  }

  const formattedValue = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value)

  return `${formattedValue} USD`
}

export function buildReservationSummaryCardData({
  snapshot,
}: BuildReservationSummaryCardDataArgs) {
  const totalAmount = snapshot.totalAmount
  const nights =
    snapshot.checkInDate && snapshot.checkOutDate
      ? Math.max(
          dayjs(snapshot.checkOutDate).diff(
            dayjs(snapshot.checkInDate),
            'day'
          ),
          0
        )
      : 0

  const stayLabel =
    snapshot.checkInDate && snapshot.checkOutDate
      ? `${dayjs(snapshot.checkInDate).format(
          'DD MMM'
        )} - ${dayjs(snapshot.checkOutDate).format(
          'DD MMM YYYY'
        )}`
      : 'Select check-in and check-out'

  const guests = snapshot.numberOfGuests || 0
  const rooms = snapshot.roomNumbers.length

  return {
    roomsValue:
      rooms > 0
        ? snapshot.roomNumbers.join(', ')
        : 'Select at least one room',

    stayValue:
      nights > 0
        ? `${stayLabel} · ${nights} night${nights > 1 ? 's' : ''}`
        : stayLabel,

    occupancyValue: `${guests} guest${
      guests !== 1 ? 's' : ''
    } · ${rooms} room${rooms !== 1 ? 's' : ''}`,

    sourceValue: snapshot.source || 'Select reservation source',
    totalAmount: formatAmount(totalAmount),
  }
}

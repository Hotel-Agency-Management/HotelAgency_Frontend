import type { TFunction } from 'i18next'
import type { RoomResponse } from '../../types/room'

export function buildRoomInfoRows(
  t: TFunction,
  locale: string,
  room: Pick<
    RoomResponse,
    | 'floorNumber'
    | 'capacity'
    | 'dailyPrice'
    | 'weeklyPrice'
    | 'monthlyPrice'
    | 'extendPrice'
    | 'yearlyInsurance'
    | 'insurancePerReservation'
  >
): [string, string][] {
  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(value)

  return [
    [t('hotelRooms.profile.floor'), String(room.floorNumber)],
    [t('hotelRooms.profile.capacity'), String(room.capacity)],
    [t('hotelRooms.profile.dailyPrice', { defaultValue: 'Daily price' }), formatPrice(room.dailyPrice)],
    [t('hotelRooms.profile.weeklyPrice', { defaultValue: 'Weekly price' }), formatPrice(room.weeklyPrice)],
    [t('hotelRooms.profile.monthlyPrice', { defaultValue: 'Monthly price' }), formatPrice(room.monthlyPrice)],
    [t('hotelRooms.profile.extendPrice', { defaultValue: 'Extend price' }), formatPrice(room.extendPrice)],
    [t('hotelRooms.profile.yearlyInsurance', { defaultValue: 'Yearly insurance' }), formatPrice(room.yearlyInsurance)],
    [
      t('hotelRooms.profile.insurancePerReservation', { defaultValue: 'Insurance per reservation' }),
      formatPrice(room.insurancePerReservation)
    ]
  ]
}

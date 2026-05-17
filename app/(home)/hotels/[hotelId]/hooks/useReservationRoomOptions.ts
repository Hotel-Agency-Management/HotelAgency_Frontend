import { ROOM_STATUS } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import {
  getPublicRoomExtendPrice,
  getPublicRoomId,
  getPublicRoomNightlyRate,
  getPublicRoomTypeName,
} from '../utils/publicRoomFields'
import type { ReservationEditRoomOption } from './useReservationEdit'
import { useCustomerHotelRooms } from './useCustomerHotelRooms'

export function useReservationRoomOptions(
  hotelId: string,
  currentReservationRoomId: string | undefined
) {
  const roomsQuery = useCustomerHotelRooms(hotelId)
  const availableRooms = roomsQuery.data ?? []

  const roomOptions: ReservationEditRoomOption[] = availableRooms.map(hotelRoom => ({
    id: getPublicRoomId(hotelRoom),
    label: `${hotelRoom.roomNumber} • ${getPublicRoomTypeName(hotelRoom)}`,
    capacity: hotelRoom.capacity,
    nightlyRate: getPublicRoomNightlyRate(hotelRoom) ?? 0,
    extendPrice: getPublicRoomExtendPrice(hotelRoom) ?? 0,
    disabled:
      getPublicRoomId(hotelRoom) !== currentReservationRoomId &&
      [ROOM_STATUS.MAINTENANCE, ROOM_STATUS.BLOCKED].includes(
        hotelRoom.status.toLowerCase() as
          | typeof ROOM_STATUS.MAINTENANCE
          | typeof ROOM_STATUS.BLOCKED
      ),
  }))

  return { roomOptions, availableRooms }
}

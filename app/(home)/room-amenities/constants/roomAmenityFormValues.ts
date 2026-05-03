import type { RoomAmenityFormValues } from '../schema/roomAmenitySchema'

export const ROOM_AMENITIES_KEY = ['room-amenities'] as const

export const defaultRoomAmenityFormValues: RoomAmenityFormValues = {
  name: '',
}
export const PAGE_SIZE = 8
export const NAME_TOOLTIP_LIMIT = 24

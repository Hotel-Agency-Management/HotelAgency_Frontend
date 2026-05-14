import type { RoomListParams } from '../configs/roomConfig'

export const ROOM_QUERY_KEYS = {
  rooms: ['rooms'] as const,
  roomsByHotelList: (hotelId: number) => ['rooms', hotelId] as const,
  roomsByHotel: (hotelId: number, params?: RoomListParams) => ['rooms', hotelId, params] as const,
  room: (hotelId: number, roomId: number) => ['rooms', hotelId, roomId] as const,
  roomPhotos: (hotelId: number, roomId: number) => ['rooms', hotelId, roomId, 'photos'] as const,
}

export const ADMIN_ROOM_QUERY_KEYS = {
  roomsByHotelList: (agencyId: number, hotelId: number) =>
    ['admin', 'rooms', 'hotel', agencyId, hotelId] as const,
  roomsByHotel: (agencyId: number, hotelId: number, params?: RoomListParams) =>
    ['admin', 'rooms', 'hotel', agencyId, hotelId, params] as const,
  room: (agencyId: number, hotelId: number, roomId: number) =>
    ['admin', 'rooms', agencyId, hotelId, roomId] as const,
  roomPhotos: (agencyId: number, hotelId: number, roomId: number) =>
    ['admin', 'rooms', 'photos', agencyId, hotelId, roomId] as const,
}

import { useQuery } from '@tanstack/react-query'
import { adminGetRoomsByHotel, adminGetRoomById } from '../../clients/adminRoomClient'
import { adminGetRoomPhotos } from '../../clients/adminRoomPhotoClient'
import { ADMIN_ROOM_QUERY_KEYS } from '../../constants/roomKey'
import type { RoomListParams } from '../../configs/roomConfig'

export function useAdminRoomsByHotel(agencyId?: number, hotelId?: number, params?: RoomListParams) {
  return useQuery({
    queryKey: ADMIN_ROOM_QUERY_KEYS.roomsByHotel(agencyId as number, hotelId as number, params),
    queryFn: ({ signal }) => adminGetRoomsByHotel(agencyId as number, hotelId as number, params, signal),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId),
    placeholderData: prev => prev,
  })
}

export function useAdminRoomById(
  agencyId?: number,
  hotelId?: number,
  roomId?: number
) {
  return useQuery({
    queryKey: ADMIN_ROOM_QUERY_KEYS.room(agencyId as number, hotelId as number, roomId as number),
    queryFn: () => adminGetRoomById(agencyId as number, hotelId as number, roomId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId) && Number.isFinite(roomId),
  })
}

export function useAdminRoomPhotos(
  agencyId?: number,
  hotelId?: number,
  roomId?: number
) {
  return useQuery({
    queryKey: ADMIN_ROOM_QUERY_KEYS.roomPhotos(agencyId as number, hotelId as number, roomId as number),
    queryFn: () => adminGetRoomPhotos(agencyId as number, hotelId as number, roomId as number),
    enabled: Number.isFinite(agencyId) && Number.isFinite(hotelId) && Number.isFinite(roomId),
  })
}

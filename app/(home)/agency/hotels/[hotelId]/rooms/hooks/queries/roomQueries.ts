import { useQuery } from '@tanstack/react-query'
import { getRoomsByHotel, getRoomById } from '../../clients/roomClient'
import { getRoomPhotos } from '../../clients/roomPhotoClient'
import { ROOM_QUERY_KEYS } from '../../constants/roomKey'
import type { RoomListParams } from '../../configs/roomConfig'

export function useRoomsByHotel(hotelId?: number, params?: RoomListParams) {
  return useQuery({
    queryKey: ROOM_QUERY_KEYS.roomsByHotel(hotelId as number, params),
    queryFn: ({ signal }) => getRoomsByHotel(hotelId as number, params, signal),
    enabled: Number.isFinite(hotelId),
    placeholderData: prev => prev,
  })
}

export function useRoomById(hotelId?: number, roomId?: number) {
  return useQuery({
    queryKey: ROOM_QUERY_KEYS.room(hotelId as number, roomId as number),
    queryFn: () => getRoomById(hotelId as number, roomId as number),
    enabled: Number.isFinite(hotelId) && Number.isFinite(roomId),
  })
}

export function useRoomPhotos(hotelId?: number, roomId?: number) {
  return useQuery({
    queryKey: ROOM_QUERY_KEYS.roomPhotos(hotelId as number, roomId as number),
    queryFn: () => getRoomPhotos(hotelId as number, roomId as number),
    enabled: Number.isFinite(hotelId) && Number.isFinite(roomId),
  })
}

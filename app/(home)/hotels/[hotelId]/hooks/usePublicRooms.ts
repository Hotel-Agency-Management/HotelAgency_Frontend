'use client'

import { useQuery } from '@tanstack/react-query'
import {
  getPublicRooms,
  getPublicRoomById,
  getPublicRoomPhotos,
} from '../../client/roomClient'
import { publicRoomsQueryKeys } from '../../constants/roomKey'

export const usePublicRooms = (hotelId: string) =>
  useQuery({
    queryKey: publicRoomsQueryKeys.all(hotelId),
    queryFn: () => getPublicRooms(hotelId),
    enabled: hotelId.length > 0,
  })

export const usePublicRoomById = (hotelId: string, roomId: string) =>
  useQuery({
    queryKey: publicRoomsQueryKeys.detail(hotelId, roomId),
    queryFn: () => getPublicRoomById(hotelId, roomId),
    enabled: hotelId.length > 0 && roomId.length > 0,
  })

export const usePublicRoomPhotos = (hotelId: string, roomId: string) =>
  useQuery({
    queryKey: publicRoomsQueryKeys.photos(hotelId, roomId),
    queryFn: () => getPublicRoomPhotos(hotelId, roomId),
    enabled: hotelId.length > 0 && roomId.length > 0,
  })

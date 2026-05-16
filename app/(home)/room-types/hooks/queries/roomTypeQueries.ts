import { useQuery } from '@tanstack/react-query'
import { getRoomTypes, getRoomTypeById, getOwnerRoomTypes } from '../../clients/roomTypeClient'
import type { RoomType } from '../../types/roomType'

export const roomTypeQueryKeys = {
  all: ['roomTypes'] as const,
  list: () => ['roomTypes', 'list'] as const,
  detail: (id?: number) => ['roomTypes', 'detail', id] as const,
}

export const useGetRoomTypes = (enabled = true) => {
  return useQuery<RoomType[]>({
    queryKey: roomTypeQueryKeys.list(),
    queryFn: getRoomTypes,
    enabled,
  })
}

export const useGetOwnerRoomTypes = (enabled = true) => {
  return useQuery<RoomType[]>({
    queryKey: ['ownerRoomTypes', 'list'],
    queryFn: getOwnerRoomTypes,
    enabled,
  })
}

export const useGetRoomTypeById = (id?: number) => {
  return useQuery<RoomType>({
    queryKey: roomTypeQueryKeys.detail(id),
    queryFn: () => getRoomTypeById(id as number),
    enabled: Number.isFinite(id),
  })
}

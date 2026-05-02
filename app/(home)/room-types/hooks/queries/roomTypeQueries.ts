import { useQuery } from '@tanstack/react-query'
import { getRoomTypes, getRoomTypeById } from '../../clients/roomTypeClient'
import type { RoomType } from '../../types/roomType'

export const roomTypeQueryKeys = {
  all: ['roomTypes'] as const,
  list: () => ['roomTypes', 'list'] as const,
  detail: (id?: number) => ['roomTypes', 'detail', id] as const,
}

export const useGetRoomTypes = () => {
  return useQuery<RoomType[]>({
    queryKey: roomTypeQueryKeys.list(),
    queryFn: getRoomTypes,
  })
}

export const useGetRoomTypeById = (id?: number) => {
  return useQuery<RoomType>({
    queryKey: roomTypeQueryKeys.detail(id),
    queryFn: () => getRoomTypeById(id as number),
    enabled: Number.isFinite(id),
  })
}

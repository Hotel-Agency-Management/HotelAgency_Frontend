import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRoomType, updateRoomType, deleteRoomType } from '../../clients/roomTypeClient'
import type { CreateRoomTypePayload, RoomType, UpdateRoomTypePayload } from '../../types/roomType'
import { roomTypeQueryKeys } from '../queries/roomTypeQueries'

export const useCreateRoomType = () => {
  const queryClient = useQueryClient()

  return useMutation<RoomType, unknown, CreateRoomTypePayload>({
    mutationFn: createRoomType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomTypeQueryKeys.list() })
    },
  })
}

export const useUpdateRoomType = () => {
  const queryClient = useQueryClient()

  return useMutation<RoomType, unknown, UpdateRoomTypePayload>({
    mutationFn: updateRoomType,
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: roomTypeQueryKeys.list() })
      queryClient.invalidateQueries({ queryKey: roomTypeQueryKeys.detail(updated.id) })
    },
  })
}

export const useDeleteRoomType = () => {
  const queryClient = useQueryClient()

  return useMutation<void, unknown, number>({
    mutationFn: deleteRoomType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomTypeQueryKeys.list() })
    },
  })
}

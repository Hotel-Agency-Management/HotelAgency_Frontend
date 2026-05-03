import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createRoom, updateRoom, deleteRoom } from '../../clients/roomClient'
import { uploadRoomPhoto, deleteRoomPhoto } from '../../clients/roomPhotoClient'
import { CreateRoomRequest, UpdateRoomRequest } from '../../configs/roomConfig'
import { ROOM_QUERY_KEYS } from '../../constants/roomKey'

export function useCreateRoom(hotelId?: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRoomRequest) => createRoom(hotelId as number, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomsByHotel(hotelId as number),
      })
      toast.success('Room created successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useUpdateRoom(hotelId?: number, roomId?: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateRoomRequest) =>
      updateRoom(hotelId as number, roomId as number, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.room(hotelId as number, roomId as number),
      })
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomsByHotel(hotelId as number),
      })
      toast.success('Room updated successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useDeleteRoom(hotelId?: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (roomId: number) => deleteRoom(hotelId as number, roomId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomsByHotel(hotelId as number),
      })
      toast.success('Room deleted successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useUploadRoomPhoto(hotelId?: number, roomId?: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => uploadRoomPhoto(hotelId as number, roomId as number, file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomPhotos(hotelId as number, roomId as number),
      })
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.room(hotelId as number, roomId as number),
      })
      toast.success('Photo uploaded successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useDeleteRoomPhoto(hotelId?: number, roomId?: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (photoId: number) =>
      deleteRoomPhoto(hotelId as number, roomId as number, photoId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomPhotos(hotelId as number, roomId as number),
      })
      toast.success('Photo deleted successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

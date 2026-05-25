import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createRoom, updateRoom, deleteRoom } from '../../clients/roomClient'
import { uploadRoomPhoto, deleteRoomPhoto } from '../../clients/roomPhotoClient'
import { CreateRoomRequest, UpdateRoomRequest } from '../../configs/roomConfig'
import { ROOM_QUERY_KEYS } from '../../constants/roomKey'
import { useTranslation } from 'react-i18next'

export function useCreateRoom(hotelId?: number) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRoomRequest) => createRoom(hotelId as number, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomsByHotelList(hotelId as number)
      })
      toast.success(t('hotelRooms.toast.roomCreated', { defaultValue: 'Room created successfully' }))
    },

    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}

export function useUpdateRoom(hotelId?: number, roomId?: number) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateRoomRequest) => updateRoom(hotelId as number, roomId as number, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.room(hotelId as number, roomId as number)
      })
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomsByHotelList(hotelId as number)
      })
      toast.success(t('hotelRooms.toast.roomUpdated', { defaultValue: 'Room updated successfully' }))
    },

    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}

export function useDeleteRoom(hotelId?: number) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (roomId: number) => deleteRoom(hotelId as number, roomId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomsByHotelList(hotelId as number)
      })
      toast.success(t('hotelRooms.toast.roomDeleted', { defaultValue: 'Room deleted successfully' }))
    },

    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}

export function useUploadRoomPhoto(hotelId?: number, roomId?: number) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => uploadRoomPhoto(hotelId as number, roomId as number, file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomPhotos(hotelId as number, roomId as number)
      })
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.room(hotelId as number, roomId as number)
      })
      toast.success(t('hotelRooms.toast.photoUploaded', { defaultValue: 'Photo uploaded successfully' }))
    },

    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}

export function useDeleteRoomPhoto(hotelId?: number, roomId?: number) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (photoId: number) => deleteRoomPhoto(hotelId as number, roomId as number, photoId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_QUERY_KEYS.roomPhotos(hotelId as number, roomId as number)
      })
      toast.success(t('hotelRooms.toast.photoDeleted', { defaultValue: 'Photo deleted successfully' }))
    },

    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}

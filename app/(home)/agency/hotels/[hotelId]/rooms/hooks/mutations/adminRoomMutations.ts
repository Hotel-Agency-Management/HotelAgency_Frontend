import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { adminCreateRoom, adminUpdateRoom, adminDeleteRoom } from '../../clients/adminRoomClient'
import { adminUploadRoomPhoto, adminDeleteRoomPhoto } from '../../clients/adminRoomPhotoClient'
import { CreateRoomRequest, UpdateRoomRequest } from '../../configs/roomConfig'
import { ADMIN_ROOM_QUERY_KEYS } from '../../constants/roomKey'

export function useAdminCreateRoom(agencyId?: number, hotelId?: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRoomRequest) =>
      adminCreateRoom(agencyId as number, hotelId as number, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_ROOM_QUERY_KEYS.roomsByHotel(agencyId as number, hotelId as number),
      })
      toast.success('Room created successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useAdminUpdateRoom(
  agencyId?: number,
  hotelId?: number,
  roomId?: number
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateRoomRequest) =>
      adminUpdateRoom(agencyId as number, hotelId as number, roomId as number, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_ROOM_QUERY_KEYS.room(agencyId as number, hotelId as number, roomId as number),
      })
      queryClient.invalidateQueries({
        queryKey: ADMIN_ROOM_QUERY_KEYS.roomsByHotel(agencyId as number, hotelId as number),
      })
      toast.success('Room updated successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useAdminDeleteRoom(agencyId?: number, hotelId?: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (roomId: number) => adminDeleteRoom(agencyId as number, hotelId as number, roomId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_ROOM_QUERY_KEYS.roomsByHotel(agencyId as number, hotelId as number),
      })
      toast.success('Room deleted successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useAdminUploadRoomPhoto(
  agencyId?: number,
  hotelId?: number,
  roomId?: number
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) =>
      adminUploadRoomPhoto(agencyId as number, hotelId as number, roomId as number, file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_ROOM_QUERY_KEYS.roomPhotos(agencyId as number, hotelId as number, roomId as number),
      })
      queryClient.invalidateQueries({
        queryKey: ADMIN_ROOM_QUERY_KEYS.room(agencyId as number, hotelId as number, roomId as number),
      })
      toast.success('Photo uploaded successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useAdminDeleteRoomPhoto(
  agencyId?: number,
  hotelId?: number,
  roomId?: number
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (photoId: number) =>
      adminDeleteRoomPhoto(agencyId as number, hotelId as number, roomId as number, photoId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_ROOM_QUERY_KEYS.roomPhotos(agencyId as number, hotelId as number, roomId as number),
      })
      toast.success('Photo deleted successfully')
    },

    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

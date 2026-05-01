import apiClient from '@/core/clients/apiClient'
import { RoomPhotoResponse } from '../configs/roomPhotoConfig'
import { BASE_ADMIN } from '../configs/roomConfig'

export async function adminUploadRoomPhoto(
  agencyId: number,
  hotelId: number,
  roomId: number,
  file: File
): Promise<RoomPhotoResponse> {
  const formData = new FormData()
  formData.append('photo', file)

  const response = await apiClient.post<RoomPhotoResponse>(
    `${BASE_ADMIN}/${agencyId}/hotels/${hotelId}/rooms/${roomId}/photos`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data
}

export async function adminGetRoomPhotos(
  agencyId: number,
  hotelId: number,
  roomId: number
): Promise<RoomPhotoResponse[]> {
  const response = await apiClient.get<RoomPhotoResponse[]>(
    `${BASE_ADMIN}/${agencyId}/hotels/${hotelId}/rooms/${roomId}/photos`
  )

  return response.data
}

export async function adminDeleteRoomPhoto(
  agencyId: number,
  hotelId: number,
  roomId: number,
  photoId: number
): Promise<void> {
  await apiClient.delete(
    `${BASE_ADMIN}/${agencyId}/hotels/${hotelId}/rooms/${roomId}/photos/${photoId}`
  )
}

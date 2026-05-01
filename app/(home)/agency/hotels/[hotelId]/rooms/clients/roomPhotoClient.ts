import apiClient from '@/core/clients/apiClient'
import { RoomPhotoResponse } from '../configs/roomPhotoConfig'
import { BASE } from '../configs/roomConfig'

const getPhotosPath = (hotelId: number, roomId: number) =>
  `${BASE}/${hotelId}/rooms/${roomId}/photos`

export async function uploadRoomPhoto(
  hotelId: number,
  roomId: number,
  file: File
): Promise<RoomPhotoResponse> {
  const formData = new FormData()
  formData.append('photo', file)

  const response = await apiClient.post<RoomPhotoResponse>(
    getPhotosPath(hotelId, roomId),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )

  return response.data
}

export async function getRoomPhotos(
  hotelId: number,
  roomId: number
): Promise<RoomPhotoResponse[]> {
  const response = await apiClient.get<RoomPhotoResponse[]>(
    getPhotosPath(hotelId, roomId)
  )

  return response.data
}

export async function deleteRoomPhoto(
  hotelId: number,
  roomId: number,
  photoId: number
): Promise<void> {
  await apiClient.delete(
    `${getPhotosPath(hotelId, roomId)}/${photoId}`
  )
}

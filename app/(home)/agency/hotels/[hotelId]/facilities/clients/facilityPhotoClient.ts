import apiClient from "@/core/clients/apiClient"
import { FacilityPhotoResponse, FacilityPhotoItem } from "../configs/facilityPhotosConfig"

export const uploadFacilityPhoto = async (
  hotelId: number,
  facilityId: number,
  file: File
): Promise<FacilityPhotoResponse> => {
  const formData = new FormData()
  formData.append("Photo", file)

  const response = await apiClient.post<FacilityPhotoResponse>(
    `/hotels/${hotelId}/facilities/${facilityId}/photos`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return response.data
}

export const getFacilityPhotos = async (
  hotelId: number,
  facilityId: number
): Promise<FacilityPhotoItem[]> => {
  const response = await apiClient.get<FacilityPhotoItem[]>(
    `/hotels/${hotelId}/facilities/${facilityId}/photos`
  )

  return response.data
}

export const getFacilityPhotoById = async (
  hotelId: number,
  facilityId: number,
  photoId: number
): Promise<FacilityPhotoResponse> => {
  const response = await apiClient.get<FacilityPhotoResponse>(
    `/hotels/${hotelId}/facilities/${facilityId}/photos/${photoId}`
  )

  return response.data
}

export const deleteFacilityPhoto = async (
  hotelId: number,
  facilityId: number,
  photoId: number
): Promise<void> => {
  await apiClient.delete(
    `/hotels/${hotelId}/facilities/${facilityId}/photos/${photoId}`
  )
}

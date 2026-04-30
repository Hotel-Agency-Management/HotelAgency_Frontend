import apiClient from "@/core/clients/apiClient"
import { FacilityPhotoResponse, FacilityPhotoItem } from "../configs/facilityPhotosConfig"

export const uploadFacilityPhoto = async (
  agencyId: number,
  hotelId: number,
  facilityId: number,
  file: File
): Promise<FacilityPhotoResponse> => {
  const formData = new FormData()
  formData.append("Photo", file)

  const response = await apiClient.post<FacilityPhotoResponse>(
    `/agencies/${agencyId}/hotels/${hotelId}/facilities/${facilityId}/photos`,
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
  agencyId: number,
  hotelId: number,
  facilityId: number
): Promise<FacilityPhotoItem[]> => {
  const response = await apiClient.get<FacilityPhotoItem[]>(
    `/agencies/${agencyId}/hotels/${hotelId}/facilities/${facilityId}/photos`
  )

  return response.data
}

export const getFacilityPhotoById = async (
  agencyId: number,
  hotelId: number,
  facilityId: number,
  photoId: number
): Promise<FacilityPhotoResponse> => {
  const response = await apiClient.get<FacilityPhotoResponse>(
    `/agencies/${agencyId}/hotels/${hotelId}/facilities/${facilityId}/photos/${photoId}`
  )

  return response.data
}

export const deleteFacilityPhoto = async (
  agencyId: number,
  hotelId: number,
  facilityId: number,
  photoId: number
): Promise<void> => {
  await apiClient.delete(
    `/agencies/${agencyId}/hotels/${hotelId}/facilities/${facilityId}/photos/${photoId}`
  )
}

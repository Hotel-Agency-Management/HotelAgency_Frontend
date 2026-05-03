import apiClient from "@/core/clients/apiClient"
import {
  FacilityPhotoResponse,
  FacilityPhotoItem,
} from "../configs/facilityPhotosConfig"

const adminFacilityPhotosPath = (
  agencyId: number,
  hotelId: number,
  facilityId: number
) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/facilities/${facilityId}/photos`

const adminFacilityPhotoPath = (
  agencyId: number,
  hotelId: number,
  facilityId: number,
  photoId: number
) => `${adminFacilityPhotosPath(agencyId, hotelId, facilityId)}/${photoId}`

export const uploadAdminFacilityPhoto = async (
  agencyId: number,
  hotelId: number,
  facilityId: number,
  file: File
): Promise<FacilityPhotoResponse> => {
  const formData = new FormData()
  formData.append("Photo", file)

  const response = await apiClient.post<FacilityPhotoResponse>(
    adminFacilityPhotosPath(agencyId, hotelId, facilityId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return response.data
}

export const getAdminFacilityPhotos = async (
  agencyId: number,
  hotelId: number,
  facilityId: number
): Promise<FacilityPhotoItem[]> => {
  const response = await apiClient.get<FacilityPhotoItem[]>(
    adminFacilityPhotosPath(agencyId, hotelId, facilityId)
  )

  return response.data
}

export const getAdminFacilityPhotoById = async (
  agencyId: number,
  hotelId: number,
  facilityId: number,
  photoId: number
): Promise<FacilityPhotoResponse> => {
  const response = await apiClient.get<FacilityPhotoResponse>(
    adminFacilityPhotoPath(agencyId, hotelId, facilityId, photoId)
  )

  return response.data
}

export const deleteAdminFacilityPhoto = async (
  agencyId: number,
  hotelId: number,
  facilityId: number,
  photoId: number
): Promise<void> => {
  await apiClient.delete(
    adminFacilityPhotoPath(agencyId, hotelId, facilityId, photoId)
  )
}

import apiClient from "@/core/clients/apiClient"
import type { CreateFacilityRequest, FacilityResponse } from "../configs/facilityConfig"

const adminFacilitiesPath = (agencyId: number, hotelId: number) =>
  `/admin/agencies/${agencyId}/hotels/${hotelId}/facilities`

const adminFacilityPath = (
  agencyId: number,
  hotelId: number,
  facilityId: number
) => `${adminFacilitiesPath(agencyId, hotelId)}/${facilityId}`

export const createAdminFacility = async (
  agencyId: number,
  hotelId: number,
  data: CreateFacilityRequest
): Promise<FacilityResponse> => {
  const response = await apiClient.post<FacilityResponse>(
    adminFacilitiesPath(agencyId, hotelId),
    data
  )
  return response.data
}

export const getAdminFacilities = async (
  agencyId: number,
  hotelId: number
): Promise<FacilityResponse[]> => {
  const response = await apiClient.get<FacilityResponse[]>(
    adminFacilitiesPath(agencyId, hotelId)
  )
  return response.data
}

export const getAdminFacilityById = async (
  agencyId: number,
  hotelId: number,
  facilityId: number
): Promise<FacilityResponse> => {
  const response = await apiClient.get<FacilityResponse>(
    adminFacilityPath(agencyId, hotelId, facilityId)
  )
  return response.data
}

export const updateAdminFacility = async (
  agencyId: number,
  hotelId: number,
  facilityId: number,
  data: CreateFacilityRequest
): Promise<FacilityResponse> => {
  const response = await apiClient.put<FacilityResponse>(
    adminFacilityPath(agencyId, hotelId, facilityId),
    data
  )
  return response.data
}

export const deleteAdminFacility = async (
  agencyId: number,
  hotelId: number,
  facilityId: number
): Promise<void> => {
  await apiClient.delete(adminFacilityPath(agencyId, hotelId, facilityId))
}

import apiClient from "@/core/clients/apiClient"
import type { CreateFacilityRequest, FacilityResponse } from "../configs/facilityConfig"

export const createFacility = async (
  agencyId: number,
  hotelId: number,
  data: CreateFacilityRequest
): Promise<FacilityResponse> => {
  const response = await apiClient.post<FacilityResponse>(
    `/agencies/${agencyId}/hotels/${hotelId}/facilities`,
    data
  )
  return response.data
}

export const getFacilities = async (
  agencyId: number,
  hotelId: number
): Promise<FacilityResponse[]> => {
  const response = await apiClient.get<FacilityResponse[]>(
    `/agencies/${agencyId}/hotels/${hotelId}/facilities`
  )
  return response.data
}

export const getFacilityById = async (
  agencyId: number,
  hotelId: number,
  facilityId: number
): Promise<FacilityResponse> => {
  const response = await apiClient.get<FacilityResponse>(
    `/agencies/${agencyId}/hotels/${hotelId}/facilities/${facilityId}`
  )
  return response.data
}

export const updateFacility = async (
  agencyId: number,
  hotelId: number,
  facilityId: number,
  data: CreateFacilityRequest
): Promise<FacilityResponse> => {
  const response = await apiClient.put<FacilityResponse>(
    `/agencies/${agencyId}/hotels/${hotelId}/facilities/${facilityId}`,
    data
  )
  return response.data
}

export const deleteFacility = async (
  agencyId: number,
  hotelId: number,
  facilityId: number
): Promise<void> => {
  await apiClient.delete(
    `/agencies/${agencyId}/hotels/${hotelId}/facilities/${facilityId}`
  )
}

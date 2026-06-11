import apiClient from '@/core/clients/apiClient'
import type { AgencyProfileResponse, PaginatedAgencyDTO, UpdateAgencyInfoRequest } from '../configs/agencyProfileConfig'

export async function adminGetAllAgencies(): Promise<PaginatedAgencyDTO> {
  const response = await apiClient.get<PaginatedAgencyDTO>('/admin/agencies')
  return response.data
}

export async function adminGetAgencyProfile(agencyId: number): Promise<AgencyProfileResponse> {
  const response = await apiClient.get<AgencyProfileResponse>(`/admin/agencies/${agencyId}`)
  return response.data
}

export async function adminUpdateAgencyProfile(
  agencyId: number,
  data: UpdateAgencyInfoRequest
): Promise<AgencyProfileResponse> {
  const response = await apiClient.patch<AgencyProfileResponse>(`/admin/agencies/${agencyId}`, data)
  return response.data
}

export async function adminUpdateAgencyLogo(
  agencyId: number,
  file: File
): Promise<{ message: string }> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.patch<{ message: string }>(
    `/admin/agencies/${agencyId}/update-logo`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return response.data
}

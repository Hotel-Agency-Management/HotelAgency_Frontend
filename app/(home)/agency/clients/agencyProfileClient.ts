import apiClient from '@/core/clients/apiClient'
import { AgencyProfileResponse, UpdateAgencyInfoRequest } from '../configs/agencyProfileConfig'

export async function getAgencyProfile(): Promise<AgencyProfileResponse> {
  const response = await apiClient.get<AgencyProfileResponse>('/agencies/me')
  return response.data
}

export async function updateAgencyProfile(data: UpdateAgencyInfoRequest): Promise<AgencyProfileResponse> {
  const response = await apiClient.patch<AgencyProfileResponse>('/agencies', data)
  return response.data
}

export async function updateAgencyLogo(file: File): Promise<{ message: string }> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await apiClient.patch<{ message: string }>('/agencies/update-logo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

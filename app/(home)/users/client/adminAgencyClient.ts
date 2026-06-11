import apiClient from "@/core/clients/apiClient"
import type { AgencyDTO, PaginatedAgencyDTO } from '@/app/(home)/agency/configs/agencyProfileConfig'

export async function adminGetAllAgencies(): Promise<AgencyDTO[]> {
  const response = await apiClient.get<PaginatedAgencyDTO>('/admin/agencies')
  return response.data.items
}

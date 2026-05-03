import apiClient from "@/core/clients/apiClient"
import type { Agency } from '@/app/(home)/agencies/types/agency'

export async function adminGetAllAgencies(): Promise<Agency[]> {
  const response = await apiClient.get<Agency[]>('/admin/agencies')
  return response.data
}

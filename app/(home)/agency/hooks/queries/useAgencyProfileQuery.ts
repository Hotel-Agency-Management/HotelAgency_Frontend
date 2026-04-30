import { useQuery } from '@tanstack/react-query'
import apiClient from '@/core/clients/apiClient'
import type { AgencyProfileResponse } from '../../configs/agencyProfileConfig'

export function useAgencyProfileQuery(path: string, queryKey: unknown[]) {
  return useQuery<AgencyProfileResponse>({
    queryKey,
    queryFn: () => apiClient.get<AgencyProfileResponse>(path).then(r => r.data),
  })
}

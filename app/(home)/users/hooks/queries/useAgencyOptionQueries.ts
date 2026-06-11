// useAgencyOptionQueries.ts
import { useQuery } from '@tanstack/react-query'
import type { AgencyDTO } from '@/app/(home)/agency/configs/agencyProfileConfig'
import { adminGetAllAgencies } from '../../client/adminAgencyClient'

export const useGetAdminAgencyOptions = (enabled = true) =>
  useQuery<AgencyDTO[]>({
    queryKey: ['admin', 'agency-options'],
    queryFn: adminGetAllAgencies,
    enabled,
  })

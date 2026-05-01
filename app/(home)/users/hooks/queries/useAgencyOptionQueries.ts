// useAgencyOptionQueries.ts
import { useQuery } from '@tanstack/react-query'
import type { Agency } from '@/app/(home)/agencies/types/agency'
import { adminGetAllAgencies } from '../../client/adminAgencyClient'

export const useGetAdminAgencyOptions = (enabled = true) =>
  useQuery<Agency[]>({
    queryKey: ['admin', 'agency-options'],
    queryFn: adminGetAllAgencies,
    enabled,
  })

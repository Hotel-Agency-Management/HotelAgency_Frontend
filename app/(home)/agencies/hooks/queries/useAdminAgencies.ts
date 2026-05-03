import { useQuery } from '@tanstack/react-query'
import { adminGetAllAgencies } from '@/app/(home)/agency/clients/adminAgencyClient'
import { ADMIN_AGENCIES_KEY } from '../../constants/agencyQueryKeys'

export function useAdminAgencies() {
  return useQuery({
    queryKey: ADMIN_AGENCIES_KEY,
    queryFn: adminGetAllAgencies,
  })
}

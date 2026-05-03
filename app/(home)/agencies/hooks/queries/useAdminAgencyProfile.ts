import { useQuery } from '@tanstack/react-query'
import { adminGetAgencyProfile } from '@/app/(home)/agency/clients/adminAgencyClient'
import { adminAgencyProfileKey } from '../../constants/agencyQueryKeys'

export function useGetAdminAgencyProfile(agencyId: number) {
  return useQuery({
    queryKey: adminAgencyProfileKey(agencyId),
    queryFn: () => adminGetAgencyProfile(agencyId),
  })
}

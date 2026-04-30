import { useQuery } from '@tanstack/react-query'
import { adminGetAgencyDocuments } from '@/app/(home)/agency/clients/adminAgencyDocumentsClient'
import { adminAgencyDocumentsKey } from '../../constants/agencyQueryKeys'

export function useGetAdminAgencyDocuments(agencyId: number) {
  return useQuery({
    queryKey: adminAgencyDocumentsKey(agencyId),
    queryFn: () => adminGetAgencyDocuments(agencyId),
  })
}

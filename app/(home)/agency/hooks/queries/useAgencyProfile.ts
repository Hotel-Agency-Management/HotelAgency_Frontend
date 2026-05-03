import { useQuery } from '@tanstack/react-query'
import { getAgencyProfile } from '../../clients/agencyProfileClient'
import { AGENCY_PROFILE_KEY } from '../../constants/agencyProfileConstants'

export function useGetAgencyProfile({ enabled }: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: AGENCY_PROFILE_KEY,
    queryFn: getAgencyProfile,
    enabled,
  })
}

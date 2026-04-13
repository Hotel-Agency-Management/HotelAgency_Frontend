import { useQuery } from '@tanstack/react-query'
import { getAgencyProfile } from '../../clients/agencyProfileClient'
import { AGENCY_PROFILE_KEY } from '../../constants/agencyProfileKey'

export function useGetAgencyProfile() {
  return useQuery({
    queryKey: AGENCY_PROFILE_KEY,
    queryFn: getAgencyProfile,
  })
}

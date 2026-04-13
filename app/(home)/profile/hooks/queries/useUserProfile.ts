import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '../../clients/userProfileClient'

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile
  })
}

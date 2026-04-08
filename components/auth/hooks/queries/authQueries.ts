import { useQuery } from '@tanstack/react-query'
import { verifyEmailRequest } from '@/components/auth/client/authClient'
import { VerifyEmailParams, VerifyEmailResponse } from '@/components/auth/config/authConfig'

interface UseVerifyEmailQueryOptions {
  enabled?: boolean
}

export const useVerifyEmailQuery = (
  params: VerifyEmailParams,
  options?: UseVerifyEmailQueryOptions
) => {
  return useQuery<VerifyEmailResponse, Error>({
    queryKey: ['verifyEmail', params],
    queryFn: () => verifyEmailRequest(params),
    enabled: options?.enabled ?? (!!params.userId && !!params.token),
    retry: false,
    refetchOnWindowFocus: false
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/core/clients/apiClient'
import type { AgencyProfileResponse, UpdateAgencyInfoRequest } from '../../configs/agencyProfileConfig'
import { getErrorMessage } from '@/core/utils/apiError'
import toast from 'react-hot-toast'

export function useUpdateAgencyProfileMutation(path: string, queryKey: unknown[]) {
  const queryClient = useQueryClient()

  return useMutation<AgencyProfileResponse, Error, UpdateAgencyInfoRequest>({
    mutationFn: (data) => apiClient.patch<AgencyProfileResponse>(path, data).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Agency profile updated successfully')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}

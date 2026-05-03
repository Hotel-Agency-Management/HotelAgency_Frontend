import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminUpdateAgencyProfile, adminUpdateAgencyLogo } from '@/app/(home)/agency/clients/adminAgencyClient'
import type { UpdateAgencyInfoRequest } from '@/app/(home)/agency/configs/agencyProfileConfig'
import { getErrorMessage } from '@/core/utils/apiError'
import toast from 'react-hot-toast'
import { adminAgencyProfileKey } from '../../constants/agencyQueryKeys'

export function useAdminUpdateAgencyProfile(agencyId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateAgencyInfoRequest) => adminUpdateAgencyProfile(agencyId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminAgencyProfileKey(agencyId) })
      toast.success('Agency profile updated successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useAdminUpdateAgencyLogo(agencyId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => adminUpdateAgencyLogo(agencyId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminAgencyProfileKey(agencyId) })
      toast.success('Agency logo updated successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

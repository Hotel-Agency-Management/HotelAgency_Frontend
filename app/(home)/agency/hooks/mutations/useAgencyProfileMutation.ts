import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAgencyProfile, updateAgencyLogo } from '../../clients/agencyProfileClient'
import { UpdateAgencyInfoRequest } from '../../configs/agencyProfileConfig'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { getErrorMessage } from '@/core/utils/apiError'
import { AGENCY_PROFILE_KEY } from '../../constants/agencyProfileConstants'

export function useUpdateAgencyProfile() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (data: UpdateAgencyInfoRequest) => updateAgencyProfile(data),
    onSuccess: data => {
      queryClient.setQueryData(AGENCY_PROFILE_KEY, data)
      queryClient.invalidateQueries({ queryKey: AGENCY_PROFILE_KEY })
      toast.success(t('agencySettings.toast.profileUpdated', { defaultValue: 'Agency profile updated successfully' }))
    },
    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}

export function useUpdateAgencyLogo() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: (file: File) => updateAgencyLogo(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AGENCY_PROFILE_KEY })
      toast.success(t('agencySettings.toast.logoUpdated', { defaultValue: 'Agency logo updated successfully' }))
    },
    onError: error => {
      toast.error(getErrorMessage(error))
    }
  })
}

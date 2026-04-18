import { getErrorMessage } from '@/core/utils/apiError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { updateUserProfile } from '../../clients/userProfileClient'
import { UpdateUserProfileRequest } from '../../configs/userProfileConfig'

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserProfileRequest) => updateUserProfile(data),

    onSuccess: (data) => {
      queryClient.setQueryData(['user-profile'], data)
      toast.success('Profile updated successfully')
    },

    onError: (error) => {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  })
}

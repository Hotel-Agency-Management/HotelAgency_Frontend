import { useMutation } from '@tanstack/react-query'
import { getErrorMessage } from '@/core/utils/apiError'
import { toast } from 'react-hot-toast'
import { ChangePasswordRequest } from '../../configs/changePasswordConfig'
import { changePassword } from '../../clients/changePasswordClient'

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),

    onSuccess: (data) => {
      toast.success(data.message)
    },

    onError: (error) => {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  })
}

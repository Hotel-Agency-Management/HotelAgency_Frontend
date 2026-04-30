import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/core/clients/apiClient'
import { getErrorMessage } from '@/core/utils/apiError'
import toast from 'react-hot-toast'

export function useUpdateLogoMutation(path: string, queryKey: unknown[]) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      return apiClient.patch(path, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(r => r.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Agency logo updated successfully')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}

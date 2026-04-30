import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/core/clients/apiClient'
import type { UploadAgencyDocumentPayload } from '@/components/auth/agency/configs/agencyDocumentsConfig'
import { getErrorMessage } from '@/core/utils/apiError'
import toast from 'react-hot-toast'

export function useUpdateAgencyDocumentMutation(basePath: string, queryKey: unknown[]) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ documentId, payload }: { documentId: number; payload: UploadAgencyDocumentPayload }) => {
      const formData = new FormData()
      formData.append('File', payload.file)
      formData.append('documentType', payload.documentType)
      return apiClient.put(`${basePath}/${documentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(r => r.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      toast.success('Document updated successfully')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}

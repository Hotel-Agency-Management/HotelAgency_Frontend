import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadAgencyDocumentSelf, updateAgencyDocumentSelf } from '../../clients/agencyDocumentsClient'
import type { UploadAgencyDocumentPayload } from '@/components/auth/agency/configs/agencyDocumentsConfig'
import { getErrorMessage } from '@/core/utils/apiError'
import toast from 'react-hot-toast'
import { AGENCY_DOCUMENTS_KEY } from '../../constants/agencyProfileConstants'

export function useUploadAgencyDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadAgencyDocumentPayload) => uploadAgencyDocumentSelf(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AGENCY_DOCUMENTS_KEY })
      toast.success('Document uploaded successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useUpdateAgencyDocument() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ documentId, payload }: { documentId: number; payload: UploadAgencyDocumentPayload }) =>
      updateAgencyDocumentSelf(documentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AGENCY_DOCUMENTS_KEY })
      toast.success('Document updated successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminUploadAgencyDocument, adminUpdateAgencyDocument } from '@/app/(home)/agency/clients/adminAgencyDocumentsClient'
import type { UploadAgencyDocumentPayload } from '@/components/auth/agency/configs/agencyDocumentsConfig'
import { getErrorMessage } from '@/core/utils/apiError'
import toast from 'react-hot-toast'
import { adminAgencyDocumentsKey } from '../../constants/agencyQueryKeys'

export function useAdminUploadAgencyDocument(agencyId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadAgencyDocumentPayload) => adminUploadAgencyDocument(agencyId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminAgencyDocumentsKey(agencyId) })
      toast.success('Document uploaded successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

export function useAdminUpdateAgencyDocument(agencyId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ documentId, payload }: { documentId: number; payload: UploadAgencyDocumentPayload }) =>
      adminUpdateAgencyDocument(agencyId, documentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminAgencyDocumentsKey(agencyId) })
      toast.success('Document updated successfully')
    },
    onError: (error) => {
      toast.error(getErrorMessage(error))
    },
  })
}

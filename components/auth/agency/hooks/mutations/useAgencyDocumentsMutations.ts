import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadAgencyDocument, updateAgencyDocument } from '../../clients/uploadDocumentsClient'
import { UploadAgencyDocumentPayload } from '../../configs/agencyDocumentsConfig'
import { agencyDocumentsKeys } from '../queries/useAgencyDocumentsQueries'

export const useUploadAgencyDocumentMutation = (accessToken?: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadAgencyDocumentPayload) =>
      uploadAgencyDocument(payload, accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agencyDocumentsKeys.all() })
    },
  })
}

export const useUpdateAgencyDocumentMutation = (documentId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadAgencyDocumentPayload) =>
      updateAgencyDocument(documentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agencyDocumentsKeys.all() })
    },
  })
}

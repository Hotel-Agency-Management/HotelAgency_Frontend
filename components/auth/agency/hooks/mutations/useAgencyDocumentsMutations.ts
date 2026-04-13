import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadAgencyDocument, updateAgencyDocument } from '../../clients/uploadDocumentsClient'
import { UploadAgencyDocumentPayload } from '../../configs/agencyDocumentsConfig'
import { agencyDocumentsKeys } from '../queries/useAgencyDocumentsQueries'

export const useUploadAgencyDocumentMutation = (agencyId?: number | null, accessToken?: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadAgencyDocumentPayload) => {
      if (!agencyId) {
        throw new Error('Agency id is required to upload agency documents.')
      }

      return uploadAgencyDocument(agencyId, payload, accessToken)
    },
    onSuccess: () => {
      if (agencyId) {
        queryClient.invalidateQueries({ queryKey: agencyDocumentsKeys.all(agencyId) })
      }
    },
  })
}

export const useUpdateAgencyDocumentMutation = (agencyId: number, documentId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadAgencyDocumentPayload) =>
      updateAgencyDocument(agencyId, documentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: agencyDocumentsKeys.all(agencyId) })
    },
  })
}

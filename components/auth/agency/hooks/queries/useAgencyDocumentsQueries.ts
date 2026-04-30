import { useQuery } from '@tanstack/react-query'
import { UploadAgencyDocumentResponse } from '../../configs/agencyDocumentsConfig'
import { getAgencyDocuments } from '../../clients/uploadDocumentsClient'

export const agencyDocumentsKeys = {
  all: () => ['agencyDocuments'] as const,
}

export const useGetAgencyDocumentsQuery = () => {
  return useQuery<UploadAgencyDocumentResponse[]>({
    queryKey: agencyDocumentsKeys.all(),
    queryFn: getAgencyDocuments,
  })
}

import { useQuery } from '@tanstack/react-query'
import { UploadAgencyDocumentResponse } from '../../configs/agencyDocumentsConfig'
import { getAgencyDocuments } from '../../clients/uploadDocumentsClient'

export const agencyDocumentsKeys = {
  all: (agencyId: number) => ['agencyDocuments', agencyId] as const,
}

export const useGetAgencyDocumentsQuery = (agencyId: number) => {
  return useQuery<UploadAgencyDocumentResponse>({
    queryKey: agencyDocumentsKeys.all(agencyId),
    queryFn: () => getAgencyDocuments(agencyId),
    enabled: !!agencyId,
  })
}

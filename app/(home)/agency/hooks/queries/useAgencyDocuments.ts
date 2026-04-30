import { useQuery } from '@tanstack/react-query'
import { getAgencyDocumentsSelf } from '../../clients/agencyDocumentsClient'
import { AGENCY_DOCUMENTS_KEY } from '../../constants/agencyProfileConstants'

export function useGetAgencyDocuments() {
  return useQuery({
    queryKey: AGENCY_DOCUMENTS_KEY,
    queryFn: getAgencyDocumentsSelf,
  })
}

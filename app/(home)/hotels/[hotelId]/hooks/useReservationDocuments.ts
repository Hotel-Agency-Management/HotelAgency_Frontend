import type { CustomerReservation } from '../types/customerReservation'
import {
  getSavedCustomerReservationDocumentUrls,
  resolveCustomerReservationDocumentUrl,
} from '../utils/customerReservationDocumentUrls'

export function useReservationDocuments(
  currentReservation: CustomerReservation | null,
  showFeedback: (severity: 'success' | 'error', message: string) => void
) {
  const savedDocumentUrls = currentReservation
    ? getSavedCustomerReservationDocumentUrls(currentReservation.id)
    : undefined
  const contractDocumentUrl = currentReservation
    ? (resolveCustomerReservationDocumentUrl(currentReservation.contractUrl) ??
       savedDocumentUrls?.contractUrl)
    : undefined
  const invoiceDocumentUrl = currentReservation
    ? (resolveCustomerReservationDocumentUrl(currentReservation.invoiceUrl) ??
       savedDocumentUrls?.invoiceUrl)
    : undefined

  const openContract = () => {
    if (!contractDocumentUrl) {
      showFeedback('error', 'No contract is available for this reservation.')
      return
    }
    window.open(contractDocumentUrl, '_blank', 'noopener,noreferrer')
  }

  const openInvoice = () => {
    if (!invoiceDocumentUrl) {
      showFeedback('error', 'No invoice is available for this reservation.')
      return
    }
    window.open(invoiceDocumentUrl, '_blank', 'noopener,noreferrer')
  }

  return { contractDocumentUrl, invoiceDocumentUrl, openContract, openInvoice }
}

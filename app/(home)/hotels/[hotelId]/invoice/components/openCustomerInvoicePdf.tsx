import { pdf } from '@react-pdf/renderer'
import type { CustomerInvoice } from '../types/customerInvoice'
import { CustomerInvoiceDocument } from './CustomerInvoiceDocument'

export const openCustomerInvoicePdf = async (
  invoice: CustomerInvoice,
  targetWindow: Window | null
) => {
  const blob = await pdf(<CustomerInvoiceDocument invoice={invoice} />).toBlob()
  const blobUrl = URL.createObjectURL(blob)

  if (targetWindow) {
    targetWindow.location.href = blobUrl
    targetWindow.focus()
    return
  }

  window.open(blobUrl, '_blank', 'noopener,noreferrer')
}

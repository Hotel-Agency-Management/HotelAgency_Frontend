import { pdf } from '@react-pdf/renderer'
import { DamageInvoiceDocument } from './DamageInvoiceDocument'
import type { DamageInvoice } from '../types/damageInvoice'

export async function openDamageInvoicePdf(invoice: DamageInvoice): Promise<void> {
  const blob = await pdf(<DamageInvoiceDocument invoice={invoice} />).toBlob()
  const blobUrl = URL.createObjectURL(blob)
  window.open(blobUrl, '_blank', 'noopener,noreferrer')
}

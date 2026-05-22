import { pdf } from '@react-pdf/renderer'
import { CustomerInvoiceDocument } from '../invoice/components/CustomerInvoiceDocument'
import type { CustomerInvoice } from '../invoice/types/customerInvoice'
import { ReservationContractDocument } from '../components/customerReservationContract/ReservationContractDocument'
import type { ReservationContractData } from '../types/customerReservationContract'
import { buildContractFileName } from './reservationContractHelpers'

export async function generateCustomerReservationContractFile(
  contract: ReservationContractData
): Promise<File> {
  const blob = await pdf(<ReservationContractDocument contract={contract} />).toBlob()

  return new File([blob], buildContractFileName(contract), { type: 'application/pdf' })
}

export async function generateCustomerReservationInvoiceFile(
  invoice: CustomerInvoice
): Promise<File> {
  const blob = await pdf(<CustomerInvoiceDocument invoice={invoice} />).toBlob()

  return new File([blob], `invoice-${invoice.invoiceNumber}.pdf`, {
    type: 'application/pdf',
  })
}

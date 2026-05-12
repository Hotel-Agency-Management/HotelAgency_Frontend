import { pdf } from '@react-pdf/renderer'
import { ReservationContractDocument } from '@/app/(home)/hotels/[hotelId]/components/customerReservationContract/ReservationContractDocument'
import { CustomerInvoiceDocument } from '@/app/(home)/hotels/[hotelId]/invoice/components/CustomerInvoiceDocument'
import { buildContractFileName } from '@/app/(home)/hotels/[hotelId]/utils/reservationContractHelpers'
import type { ReservationContractData } from '@/app/(home)/hotels/[hotelId]/types/customerReservationContract'
import type { CustomerInvoice } from '@/app/(home)/hotels/[hotelId]/invoice/types/customerInvoice'

export async function generateContractFile(contract: ReservationContractData): Promise<File> {
  const blob = await pdf(<ReservationContractDocument contract={contract} />).toBlob()
  return new File([blob], buildContractFileName(contract), { type: 'application/pdf' })
}

export async function generateInvoiceFile(invoice: CustomerInvoice): Promise<File> {
  const blob = await pdf(<CustomerInvoiceDocument invoice={invoice} />).toBlob()
  return new File([blob], `invoice-${invoice.invoiceNumber}.pdf`, { type: 'application/pdf' })
}

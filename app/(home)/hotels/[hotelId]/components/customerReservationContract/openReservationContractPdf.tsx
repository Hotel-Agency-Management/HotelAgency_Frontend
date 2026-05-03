import { pdf } from '@react-pdf/renderer'
import type { ReservationContractData } from '../../types/customerReservationContract'
import { ReservationContractDocument } from './ReservationContractDocument'

export const openReservationContractPdf = async (
  contract: ReservationContractData,
  targetWindow: Window | null
) => {
  const blob = await pdf(<ReservationContractDocument contract={contract} />).toBlob()
  const blobUrl = URL.createObjectURL(blob)

  if (targetWindow) {
    targetWindow.location.href = blobUrl
    targetWindow.focus()
    return
  }

  window.open(blobUrl, '_blank', 'noopener,noreferrer')
}

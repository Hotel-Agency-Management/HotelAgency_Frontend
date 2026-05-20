import { useQuery } from '@tanstack/react-query'
import { fetchPaymentLogDetails } from '../../client/paymentLogsClient'
import type { PaymentLogDetails } from '../../config/paymentLogsConfig'

export function usePaymentLogDetailsQuery(hotelId: string, paymentLogId?: number) {
  return useQuery<PaymentLogDetails>({
    queryKey: ['payment-logs', hotelId, 'details', paymentLogId],
    queryFn: () => fetchPaymentLogDetails(hotelId, paymentLogId as number),
    enabled: !!hotelId && Number.isFinite(paymentLogId),
  })
}

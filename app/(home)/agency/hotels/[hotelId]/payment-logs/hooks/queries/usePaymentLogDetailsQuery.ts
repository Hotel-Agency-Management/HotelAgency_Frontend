import { useQuery } from '@tanstack/react-query'
import { getPaymentLogDetails } from '../../client/paymentLogsClient'
import type { PaymentLogDetails } from '../../config/paymentLogsConfig'

export function usePaymentLogDetailsQuery(hotelId: string, paymentLogId?: number) {
  return useQuery<PaymentLogDetails>({
    queryKey: ['payment-logs', hotelId, 'details', paymentLogId],
    queryFn: () => getPaymentLogDetails(hotelId, paymentLogId as number),
    enabled: !!hotelId && Number.isFinite(paymentLogId),
  })
}

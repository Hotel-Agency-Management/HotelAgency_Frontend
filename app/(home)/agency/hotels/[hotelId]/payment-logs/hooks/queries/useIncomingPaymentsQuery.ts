import { useQuery } from '@tanstack/react-query'
import { fetchIncomingPayments } from '../../api/paymentLogsApi'
import type { PaymentLogsParams } from '../../types'

export function useIncomingPaymentsQuery(hotelId: string, params?: PaymentLogsParams) {
  return useQuery({
    queryKey: ['payment-logs', hotelId, 'incoming', params],
    queryFn: () => fetchIncomingPayments(hotelId, params),
    enabled: !!hotelId,
  })
}

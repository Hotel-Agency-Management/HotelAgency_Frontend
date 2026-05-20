import { useQuery } from '@tanstack/react-query'
import { fetchOutgoingPayments } from '../../api/paymentLogsApi'
import type { PaymentLogsParams } from '../../types'

export function useOutgoingPaymentsQuery(hotelId: string, params?: PaymentLogsParams) {
  return useQuery({
    queryKey: ['payment-logs', hotelId, 'outgoing', params],
    queryFn: () => fetchOutgoingPayments(hotelId, params),
    enabled: !!hotelId,
  })
}

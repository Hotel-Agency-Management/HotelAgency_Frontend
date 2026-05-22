import { useQuery } from '@tanstack/react-query'
import { getOutgoingPayments } from '../../client/paymentLogsClient'
import type { HotelPaymentLogsResponse, PaymentLogsParams } from '../../config/paymentLogsConfig'

export function useOutgoingPaymentsQuery(hotelId: string, params?: PaymentLogsParams) {
  return useQuery<HotelPaymentLogsResponse>({
    queryKey: ['payment-logs', hotelId, 'outgoing', { pageNumber: params?.pageNumber, pageSize: params?.pageSize, type: params?.type }],
    queryFn: () => getOutgoingPayments(hotelId, params),
    enabled: !!hotelId,
    placeholderData: (prev) => prev,
  })
}

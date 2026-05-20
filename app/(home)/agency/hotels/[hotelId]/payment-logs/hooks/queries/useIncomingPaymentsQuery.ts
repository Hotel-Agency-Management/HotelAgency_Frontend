import { useQuery } from '@tanstack/react-query'
import { fetchIncomingPayments } from '../../client/paymentLogsClient'
import type { HotelPaymentLogsResponse, PaymentLogsParams } from '../../config/paymentLogsConfig'

export function useIncomingPaymentsQuery(hotelId: string, params?: PaymentLogsParams) {
  return useQuery<HotelPaymentLogsResponse>({
    queryKey: ['payment-logs', hotelId, 'incoming', { pageNumber: params?.pageNumber, pageSize: params?.pageSize, type: params?.type }],
    queryFn: () => fetchIncomingPayments(hotelId, params),
    enabled: !!hotelId,
    placeholderData: (prev) => prev,
  })
}

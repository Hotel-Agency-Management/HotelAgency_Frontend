import { useQuery } from '@tanstack/react-query'
import { getPaymentLogs } from '../../client/paymentLogsClient'
import type { HotelPaymentLogsResponse, PaymentLogsParams } from '../../config/paymentLogsConfig'

export function usePaymentLogsQuery(hotelId: string, params?: PaymentLogsParams) {
  return useQuery<HotelPaymentLogsResponse>({
    queryKey: [
      'payment-logs',
      hotelId,
      {
        pageNumber: params?.pageNumber,
        pageSize: params?.pageSize,
        search: params?.search,
        transactionType: params?.transactionType,
        type: params?.type,
      },
    ],
    queryFn: () => getPaymentLogs(hotelId, params),
    enabled: !!hotelId,
    placeholderData: (prev) => prev,
  })
}

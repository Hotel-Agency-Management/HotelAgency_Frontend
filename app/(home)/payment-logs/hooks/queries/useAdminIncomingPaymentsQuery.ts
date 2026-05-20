import { useQuery } from '@tanstack/react-query'
import {
  fetchAdminHotelIncomingPayments,
} from '../../client/adminPaymentLogsClient'
import type { HotelPaymentLogsResponse, PaymentLogsParams } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'

export function useAdminIncomingPaymentsQuery(
  agencyId: string,
  hotelId: string,
  params?: PaymentLogsParams
) {
  return useQuery<HotelPaymentLogsResponse>({
    queryKey: ['admin-payment-logs', agencyId, hotelId, 'incoming', { pageNumber: params?.pageNumber, pageSize: params?.pageSize, type: params?.type }],
    queryFn: () => fetchAdminHotelIncomingPayments(agencyId, hotelId, params),
    placeholderData: (prev) => prev,
  })
}

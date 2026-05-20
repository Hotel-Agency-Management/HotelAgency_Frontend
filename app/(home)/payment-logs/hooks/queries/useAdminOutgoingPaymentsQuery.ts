import { useQuery } from '@tanstack/react-query'
import {
  fetchAdminHotelOutgoingPayments,
} from '../../client/adminPaymentLogsClient'
import type { HotelPaymentLogsResponse, PaymentLogsParams } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'

export function useAdminOutgoingPaymentsQuery(
  agencyId: string,
  hotelId: string,
  params?: PaymentLogsParams
) {
  return useQuery<HotelPaymentLogsResponse>({
    queryKey: ['admin-payment-logs', agencyId, hotelId, 'outgoing', { pageNumber: params?.pageNumber, pageSize: params?.pageSize, type: params?.type }],
    queryFn: () => fetchAdminHotelOutgoingPayments(agencyId, hotelId, params),
    placeholderData: (prev) => prev,
  })
}

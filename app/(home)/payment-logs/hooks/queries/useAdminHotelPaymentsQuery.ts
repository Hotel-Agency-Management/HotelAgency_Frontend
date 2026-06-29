import { useQuery } from '@tanstack/react-query'
import { getAdminHotelPayments } from '../../client/adminPaymentLogsClient'
import type { HotelPaymentLogsResponse, PaymentLogsParams } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'

export function useAdminHotelPaymentsQuery(
  agencyId: string | null,
  hotelId: string | null,
  params?: PaymentLogsParams
) {
  return useQuery<HotelPaymentLogsResponse>({
    queryKey: [
      'admin-payment-logs',
      agencyId,
      hotelId,
      'all',
      {
        pageNumber: params?.pageNumber,
        pageSize: params?.pageSize,
        search: params?.search,
        transactionType: params?.transactionType,
        type: params?.type,
      },
    ],
    queryFn: () => getAdminHotelPayments(agencyId as string, hotelId as string, params),
    enabled: !!agencyId && !!hotelId,
    placeholderData: (prev) => prev,
  })
}

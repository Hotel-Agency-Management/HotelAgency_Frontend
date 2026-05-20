import { useQuery } from '@tanstack/react-query'
import { fetchAdminPaymentLogDetails } from '../../client/adminPaymentLogsClient'
import type { PaymentLogDetails } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'

export function useAdminPaymentLogDetailsQuery(
  agencyId: string | null,
  hotelId: string | null,
  paymentLogId?: number
) {
  return useQuery<PaymentLogDetails>({
    queryKey: ['admin-payment-logs', agencyId, hotelId, 'details', paymentLogId],
    queryFn: () =>
      fetchAdminPaymentLogDetails(agencyId as string, hotelId as string, paymentLogId as number),
    enabled: !!agencyId && !!hotelId && Number.isFinite(paymentLogId),
  })
}

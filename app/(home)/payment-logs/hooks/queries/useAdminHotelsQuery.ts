import { useQuery } from '@tanstack/react-query'
import { getCustomerHotels } from '@/app/(home)/hotels/client/hotelClient'
import type {
  CustomerHotelsResult,
  PublicHotelsQueryParams,
} from '@/app/(home)/hotels/types/customerHotel'

export function useAdminHotelsQuery(params?: PublicHotelsQueryParams) {
  return useQuery<CustomerHotelsResult>({
    queryKey: ['admin-hotels-list', params],
    queryFn: ({ signal }) => getCustomerHotels(params, signal),
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  })
}

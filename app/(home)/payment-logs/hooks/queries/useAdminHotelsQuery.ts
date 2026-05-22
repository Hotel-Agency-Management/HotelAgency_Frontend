import { useQuery } from '@tanstack/react-query'
import { getCustomerHotels } from '@/app/(home)/hotels/client/hotelClient'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'

export function useAdminHotelsQuery() {
  return useQuery<CustomerHotel[]>({
    queryKey: ['admin-hotels-list'],
    queryFn: () => getCustomerHotels().then((r) => r.items),
    staleTime: 5 * 60 * 1000,
  })
}

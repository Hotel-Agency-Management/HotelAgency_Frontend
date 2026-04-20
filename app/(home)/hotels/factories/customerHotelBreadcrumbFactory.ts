import { createBreadcrumbFactory } from '@/components/common/breadcrumbs/factory'
import type { BreadcrumbStrategy } from '@/components/common/breadcrumbs/types'

export interface CustomerHotelBreadcrumbContext {
  hotelId?: string
  hotelName?: string | null
  roomLabel?: string | null
}

const customerHotelBreadcrumbStrategies: BreadcrumbStrategy<CustomerHotelBreadcrumbContext>[] = [
  {
    id: 'customer-hotel-room-profile',
    match: '/hotels/[hotelId]/rooms/[roomId]',
    build: ({ params, context }) => {
      const hotelId = context.hotelId ?? params.hotelId

      return [
        { label: 'Hotels', href: '/hotels' },
        {
          label: context.hotelName ?? 'Hotel',
          href: hotelId ? `/hotels/${hotelId}` : undefined,
        },
        {
          label: 'Rooms',
          href: hotelId ? `/hotels/${hotelId}` : undefined,
        },
        { label: context.roomLabel ?? 'Room' },
      ]
    },
  },
  {
    id: 'customer-hotel-rooms',
    match: '/hotels/[hotelId]',
    build: ({ params, context }) => {
      const hotelId = context.hotelId ?? params.hotelId

      return [
        { label: 'Hotels', href: '/hotels' },
        {
          label: context.hotelName ?? 'Hotel',
          href: hotelId ? `/hotels/${hotelId}` : undefined,
        },
        { label: 'Rooms' },
      ]
    },
  },
]

export const customerHotelBreadcrumbFactory = createBreadcrumbFactory(
  customerHotelBreadcrumbStrategies
)

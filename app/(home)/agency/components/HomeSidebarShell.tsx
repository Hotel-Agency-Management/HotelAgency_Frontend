'use client'

import { useMemo, type ReactNode } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import SidebarLayout from '@/core/layouts/SidebarLayout'
import type { SidebarNavItems } from '@/core/layouts/types'
import { useAuth } from '@/core/context/AuthContext'
import navigation from '@/navigation/sidebarRoutes'
import { CUSTOMER_HOTELS_MOCK } from '@/app/(home)/hotels/data/customerHotelsMock'
import { getCustomerHotels } from '@/app/(home)/hotels/data/customerHotelsClient'
import { USER_ROLES } from '@/lib/abilities'
import { useBrandNameContext } from '@/core/context/BrandNameContext'

interface HomeSidebarShellProps {
  children: ReactNode
  dynamicNavItems?: SidebarNavItems
}

const CUSTOMER_HOTEL_DETAIL_PATTERN = /^\/hotels\/([^/?#]+)/

export default function HomeSidebarShell({
  children,
  dynamicNavItems
}: HomeSidebarShellProps) {
  const params = useParams<{ agencyId?: string; hotelId?: string }>()
  const pathname = usePathname()
  const { user } = useAuth()
  const { brandName } = useBrandNameContext()

  const customerHotelId = useMemo(() => {
    const match = pathname.match(CUSTOMER_HOTEL_DETAIL_PATTERN)
    return match?.[1] ? decodeURIComponent(match[1]) : null
  }, [pathname])

  const { data: customerHotels = CUSTOMER_HOTELS_MOCK } = useQuery({
    queryKey: ['customer-hotels'],
    queryFn: getCustomerHotels,
    placeholderData: CUSTOMER_HOTELS_MOCK,
    enabled: customerHotelId != null,
  })

  const hotelId = params.hotelId ?? user?.hotelId
  const layoutVariant = user?.role === USER_ROLES.CUSTOMER ? 'top-nav' : 'sidebar'

  const appName = useMemo(() => {
    const customerHotelName = customerHotelId
      ? customerHotels.find(h => h.id === customerHotelId)?.name
      : null
    return customerHotelName ?? brandName
  }, [customerHotelId, customerHotels, brandName])

  return (
    <SidebarLayout
      navItems={navigation(hotelId, params.agencyId)}
      dynamicNavItems={dynamicNavItems}
      appName={appName}
      variant={layoutVariant}
    >
      {children}
    </SidebarLayout>
  )
}

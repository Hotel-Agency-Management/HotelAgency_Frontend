'use client'

import { useMemo, type ReactNode } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import SidebarLayout from '@/core/layouts/SidebarLayout'
import type { SidebarNavItems } from '@/core/layouts/types'
import { useAuth } from '@/core/context/AuthContext'
import navigation from '@/navigation/sidebarRoutes'
import themeConfig from '@/core/configs/themeConfig'
import { useHotelStore } from '@/app/(home)/agency/hotels/hooks/useHotelStore'
import { CUSTOMER_HOTELS_MOCK } from '@/app/(home)/hotels/data/customerHotelsMock'
import { getCustomerHotels } from '@/app/(home)/hotels/data/customerHotelsClient'
import { USER_ROLES } from '@/lib/abilities'

interface HomeSidebarShellProps {
  children: ReactNode
  dynamicNavItems?: SidebarNavItems
}

function formatDisplayName(value?: string) {
  if (!value) return null

  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

const CUSTOMER_HOTEL_DETAIL_PATTERN = /^\/hotels\/([^/?#]+)/

export default function HomeSidebarShell({
  children,
  dynamicNavItems
}: HomeSidebarShellProps) {
  const params = useParams<{ hotelId?: string }>()
  const pathname = usePathname()
  const { user } = useAuth()
  const { hotels } = useHotelStore(user?.agencyId)
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

  const agencyName = user?.agencyName ?? 'my-agency'
  const hotelId = params.hotelId ?? user?.hotelId
  const layoutVariant = user?.role === USER_ROLES.CUSTOMER ? 'top-nav' : 'sidebar'
  const appName = useMemo(() => {
    const agencyDisplayName = formatDisplayName(user?.agency?.name ?? user?.agencyName ?? agencyName)
    const customerHotelName = customerHotelId
      ? customerHotels.find(hotel => hotel.id === customerHotelId)?.name
      : null

    if (customerHotelName) {
      return customerHotelName
    }

    if (user?.role === USER_ROLES.CUSTOMER) {
      return themeConfig.templateName
    }

    if (user?.role === USER_ROLES.AGENCY_OWNER && agencyDisplayName) {
      return agencyDisplayName
    }

    if (hotelId) {
      const hotelName = hotels.find(hotel => hotel.id === hotelId)?.basicInfo.name

      if (hotelName) {
        return hotelName
      }
    }

    if (agencyDisplayName) {
      return agencyDisplayName
    }

    return themeConfig.templateName
  }, [agencyName, customerHotelId, customerHotels, hotelId, hotels, user?.agency?.name, user?.agencyName, user?.role])

  return (
    <SidebarLayout
      navItems={navigation(hotelId)}
      dynamicNavItems={dynamicNavItems}
      appName={appName}
      variant={layoutVariant}
    >
      {children}
    </SidebarLayout>
  )
}

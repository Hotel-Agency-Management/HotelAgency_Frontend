'use client'

import { useMemo, type ReactNode } from 'react'
import { useParams } from 'next/navigation'
import SidebarLayout from '@/core/layouts/SidebarLayout'
import type { SidebarNavItems } from '@/core/layouts/types'
import { useAuth } from '@/core/context/AuthContext'
import navigation from '@/navigation/sidebarRoutes'
import themeConfig from '@/core/configs/themeConfig'
import { useHotelStore } from '@/app/(home)/agency/hotels/hooks/useHotelStore'

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

export default function HomeSidebarShell({
  children,
  dynamicNavItems
}: HomeSidebarShellProps) {
  const params = useParams<{ hotelId?: string }>()
  const { user } = useAuth()
  const { hotels } = useHotelStore(user?.agencyId)

  const agencyName = user?.agencyName ?? 'my-agency'
  const hotelId = params.hotelId ?? user?.hotelId
  const appName = useMemo(() => {
    const agencyDisplayName = formatDisplayName(user?.agency?.name ?? user?.agencyName ?? agencyName)

    if (user?.role === 'AGENCY_OWNER' && agencyDisplayName) {
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
  }, [agencyName, hotelId, hotels, user?.agency?.name, user?.agencyName, user?.role])

  return (
    <SidebarLayout
      navItems={navigation(hotelId)}
      dynamicNavItems={dynamicNavItems}
      appName={appName}
    >
      {children}
    </SidebarLayout>
  )
}

'use client'

import { useMemo, type ReactNode } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import SidebarLayout from '@/core/layouts/SidebarLayout'
import type { SidebarNavItems } from '@/core/layouts/types'
import { useAuth } from '@/core/context/AuthContext'
import navigation from '@/navigation/sidebarRoutes'
import { USER_ROLES } from '@/lib/abilities'
import { useBrandNameContext } from '@/core/context/BrandNameContext'
import { getCustomerHotels } from '../../hotels/client/hotelClient'
import { CUSTOMER_HOTEL_DETAIL_PATTERN } from '../constants/routePatterns'
import { AgentChat } from '@/app/copilotKit/chat/AgentChat'
import { useCopilotAgent } from '@/app/copilotKit/hooks/useCopilotAgent'
import { useNavigateTool } from '@/app/copilotKit/tools/navigate'
import { useUiAppearanceTool } from '@/app/copilotKit/tools/theme'

interface HomeSidebarShellProps {
  children: ReactNode
  dynamicNavItems?: SidebarNavItems
}

export default function HomeSidebarShell({
  children,
  dynamicNavItems
}: HomeSidebarShellProps) {
  const params = useParams<{ agencyId?: string; hotelId?: string }>()
  const pathname = usePathname()
  const { user } = useAuth()
  const { brandName } = useBrandNameContext()
  const { t } = useTranslation()

  useCopilotAgent()
  useNavigateTool()
  useUiAppearanceTool()

  const customerHotelId = useMemo(() => {
    const match = pathname.match(CUSTOMER_HOTEL_DETAIL_PATTERN)
    return match?.[1] ? decodeURIComponent(match[1]) : null
  }, [pathname])

  const { data: customerHotelsResult } = useQuery({
    queryKey: ['customer-hotels'],
    queryFn: () => getCustomerHotels(),
    enabled: customerHotelId != null,
  })

  const hotelId = params.hotelId ?? user?.hotelId
  const layoutVariant = (!user || user.role === USER_ROLES.CUSTOMER)
    ? 'top-nav'
    : 'sidebar'

  const appName = useMemo(() => {
    const customerHotelName = customerHotelId
      ? customerHotelsResult?.items.find(h => h.id === customerHotelId)?.name
      : null
    return customerHotelName ?? brandName
  }, [customerHotelId, customerHotelsResult, brandName])

  return (
    <SidebarLayout
      navItems={navigation(hotelId, params.agencyId, t)}
      dynamicNavItems={dynamicNavItems}
      appName={appName}
      variant={layoutVariant}
    >
      {children}
      <AgentChat />
    </SidebarLayout>
  )
}

import type { ComponentType } from 'react'
import { USER_ROLES, type UserRole } from '@/lib/abilities'
import { CustomerHotelsPage } from '../../hotels/components/CustomerHotelsPage'
import SuperAdminDashboardPage from '../../admin-dashboard/page'
import AgencyOwnerDashboardPage from '../../agency-owner-dashboard/page'

type HomePageComponent = ComponentType

const roleHomePageMap: Partial<Record<UserRole, HomePageComponent>> = {
  [USER_ROLES.CUSTOMER]: CustomerHotelsPage,
  [USER_ROLES.AGENCY_OWNER]: AgencyOwnerDashboardPage,
}

export const getHomePageComponent = (role?: UserRole): HomePageComponent =>
  (role && roleHomePageMap[role]) || SuperAdminDashboardPage

import type { ComponentType } from 'react'
import { USER_ROLES, type UserRole } from '@/lib/abilities'
import { CustomerHotelsPage } from '../../hotels/components/CustomerHotelsPage'
import SuperAdminDashboardPage from '../../admin-dashboard/page'
import PropertyManagerDashboardPage from '../../property-manager-dashboard/page'

type HomePageComponent = ComponentType

const roleHomePageMap: Partial<Record<UserRole, HomePageComponent>> = {
  [USER_ROLES.CUSTOMER]: CustomerHotelsPage,
  [USER_ROLES.PROPERTY_MANAGER]: PropertyManagerDashboardPage,
}

export const getHomePageComponent = (role?: UserRole): HomePageComponent =>
  (role && roleHomePageMap[role]) || SuperAdminDashboardPage

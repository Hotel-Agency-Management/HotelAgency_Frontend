import type { ComponentType } from 'react'
import { USER_ROLES, type UserRole } from '@/lib/abilities'
import { CustomerHotelsPage } from '../../hotels/components/CustomerHotelsPage'
import SuperAdminDashboardPage from '../../admin-dashboard/page'
import AgencyOwnerDashboardPage from '../../agency-owner-dashboard/page'
import PropertyManagerDashboardPage from '../../property-manager-dashboard/page'
import FrontDeskDashboardPage from '../../front-desk-dashboard/page'

type HomePageComponent = ComponentType

const roleHomePageMap: Partial<Record<UserRole, HomePageComponent>> = {
  [USER_ROLES.CUSTOMER]: CustomerHotelsPage,
  [USER_ROLES.AGENCY_OWNER]: AgencyOwnerDashboardPage,
  [USER_ROLES.PROPERTY_MANAGER]: PropertyManagerDashboardPage,
  [USER_ROLES.FRONT_DESK_STAFF]: FrontDeskDashboardPage,
}

export const getHomePageComponent = (role?: UserRole): HomePageComponent =>
  (role && roleHomePageMap[role]) || SuperAdminDashboardPage
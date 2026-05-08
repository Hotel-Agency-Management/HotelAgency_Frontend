import type { ComponentType } from 'react'
import { USER_ROLES, type UserRole } from '@/lib/abilities'
import { CustomerHotelsPage } from '../../hotels/components/CustomerHotelsPage'
import SuperAdminDashboardPage from '../../admin-dashboard/page'
<<<<<<< support-property-manager-dashboard
import PropertyManagerDashboardPage from '../../property-manager-dashboard/page'
=======
import FrontDeskDashboardPage from '../../front-desk-dashboard/page'
>>>>>>> main

type HomePageComponent = ComponentType

const roleHomePageMap: Partial<Record<UserRole, HomePageComponent>> = {
  [USER_ROLES.CUSTOMER]: CustomerHotelsPage,
<<<<<<< support-property-manager-dashboard
  [USER_ROLES.PROPERTY_MANAGER]: PropertyManagerDashboardPage,
=======
  [USER_ROLES.FRONT_DESK_STAFF]: FrontDeskDashboardPage,
>>>>>>> main
}

export const getHomePageComponent = (role?: UserRole): HomePageComponent =>
  (role && roleHomePageMap[role]) || SuperAdminDashboardPage

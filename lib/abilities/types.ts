import type { MongoAbility } from '@casl/ability'

/**
 * Subject types for authorization
 * These represent resource areas in the application
 */
export type Subjects =
  | 'Home'
  | 'Dashboard'
  | 'Users'
  | 'Settings'
  | 'Reports'
  | 'Tickets'
  | 'Agency'
  | 'Hotels'
  | 'Agencies'
  | 'AgencySettings'
  | 'AgencyApproval'
  | 'SubscriptionPlans'
  | 'HotelSettings'
  | 'HotelManagement'
  | 'HotelInformation'
  | 'Rooms'
  | 'Operations'
  | 'Housekeeping'
  | 'HousekeepingTasks'
  | 'HousekeepingStaff'
  | 'Maintenance'
  | 'Insurance'
  | 'Finance'
  | 'Bookings'
  | 'all'

/**
 * Action types for CASL permissions
 * - read: View resources
 * - create: Create new resources
 * - update: Modify existing resources
 * - delete: Remove resources
 * - manage: Full access (all actions)
 */
export type Actions = 'read' | 'create' | 'update' | 'delete' | 'manage'

/**
 * CASL Ability type for the application
 */
export type AppAbility = MongoAbility<[Actions, Subjects]>

/**
 * Supported user roles
 */
export const USER_ROLES = [
  'SUPER_ADMIN',
  'AGENCY_OWNER',
  'PROPERTY_MANAGER',
  'FRONT_DESK_STAFF',
  'HOUSEKEEPING_MANAGER',
  'HOUSEKEEPING_EMPLOYEE',
  'ACCOUNTANT',
  'CUSTOMER_SUPPORT',
  'AUDITOR',
  'CUSTOMER',
] as const

export type UserRole = (typeof USER_ROLES)[number]

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  AGENCY_OWNER: 'Agency Owner',
  PROPERTY_MANAGER: 'Property Manager',
  FRONT_DESK_STAFF: 'Front Desk Staff',
  HOUSEKEEPING_MANAGER: 'Housekeeping Manager',
  HOUSEKEEPING_EMPLOYEE: 'Housekeeping Employee',
  ACCOUNTANT: 'Accountant',
  CUSTOMER_SUPPORT: 'Customer Support',
  AUDITOR: 'Auditor',
  CUSTOMER: 'Customer',
}

export const USER_ROLE_OPTIONS: { value: UserRole; label: string }[] = USER_ROLES.map(role => ({
  value: role,
  label: USER_ROLE_LABELS[role]
}))

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLES.includes(value as UserRole)
}

/**
 * Minimal user type for authorization checks
 */
export interface AuthUser {
  id: string
  role: UserRole
  agencyName?: string
  hotelId?: string
}

/**
 * Route permission mapping entry
 * Maps a route pattern to required CASL permission
 */
export interface RoutePermission {
  /** Route pattern (exact, [param], or wildcard /*) */
  pattern: string
  /** Required action to access the route */
  action: Actions
  /** Required subject for the route */
  subject: Subjects
  /** Optional description for documentation */
  description?: string
}

/**
 * Result of matching a route against patterns
 */
export interface MatchedRoute {
  /** The matched permission entry */
  permission: RoutePermission
  /** Extracted dynamic parameters */
  params: Record<string, string>
}

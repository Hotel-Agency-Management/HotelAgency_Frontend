import { AbilityBuilder, createMongoAbility } from '@casl/ability'
import { USER_ROLES, type AppAbility, type UserRole, type Actions, type Subjects } from './types'

/**
 * Define CASL abilities for each role
 *
 * @param role - The user's role
 * @returns CASL Ability instance with permissions for that role
 */
export function defineAbilitiesFor(role: UserRole): AppAbility {
  const { can, build, cannot } = new AbilityBuilder<AppAbility>(createMongoAbility)

  switch (role) {
    case USER_ROLES.SUPER_ADMIN:
      // Admin has full access to everything
      can('manage', 'all')
      cannot('manage', 'AgencySettings')

      break
    case USER_ROLES.AGENCY_OWNER:
      can('manage', 'Dashboard')
      can('manage', 'Users')
      can('read', 'Agency')
      can('manage', 'Agency')
      can ('manage' , 'Hotels')
      can('manage', 'AgencySettings')
      can ('manage', 'Hotels')
      can('manage', 'RoomTypes')
      can ('update', 'HotelInformation')
      can('manage', 'Reservations')
      can('manage' , 'HotelTerms')
      can('manage', 'AllPaymentLogs')
      can('read', 'SystemLogs')
      can('manage', 'Housekeeping')
      can('manage', 'HousekeepingTickets')
      can('manage', 'HousekeepingStaff')
      break

    case USER_ROLES.PROPERTY_MANAGER:
      can('read', 'Agency')
      can('read', 'Hotels')
      can('manage', 'Dashboard')
      can('manage', 'Users')
      can('manage', 'HotelManagement')
      can('manage', 'HotelSettings')
      can('manage', 'Rooms')
      can('manage', 'Operations')
      can('manage', 'Housekeeping')
      can('manage', 'HousekeepingTickets')
      can('manage', 'HousekeepingStaff')
      can('manage', 'Maintenance')
      can('manage', 'Insurance')
      can('manage', 'Finance')
      can('manage', 'Bookings')
      can('create', 'Reservations')
      can('read', 'Reservations')
      can('manage' , 'HotelTerms')
      can('read', 'DamageReports')
      can('manage', 'DamageInvoices')
      can('manage', 'PaymentLogs')
      can('read', 'SystemLogs')
      break

    case USER_ROLES.FRONT_DESK_STAFF:
      can('manage', 'Dashboard')
      can('read', 'Agency')
      can('read', 'Hotels')
      can('create', 'Reservations')
      can('read', 'Reservations')
      can('read', 'DamageReports')
      can('manage', 'DamageInvoices')
      can('manage', 'Housekeeping')
      can('manage', 'HousekeepingTickets')
      break

    case USER_ROLES.CUSTOMER:
      can('read', 'AllHotels')
      can('read', 'Reservations')
      break

    case USER_ROLES.HOUSEKEEPING_MANAGER:
      can('manage', 'Dashboard')
      can('manage', 'Housekeeping')
      can('manage', 'HousekeepingTickets')
      can('manage', 'DamageReports')
      break

    case USER_ROLES.HOUSEKEEPING_EMPLOYEE:
      can('manage', 'Housekeeping')
      can('manage', 'HousekeepingTickets')
      can('create', 'DamageReports')
      can('read', 'DamageReports')
      break

    case USER_ROLES.ACCOUNTANT:
      can('manage', 'Dashboard')
      can('read', 'Agency')
      can('read', 'Hotels')
      can('read', 'PaymentLogs')
      can('read', 'Finance')
      break

    default:
      // Unknown roles get no permissions
      break
  }

  return build()
}

/**
 * Quick check if a role can access a subject with given action
 *
 * @param role - User's role
 * @param action - The action to check
 * @param subject - The subject to check against
 * @returns true if the role has permission
 */
export function canAccess(role: UserRole, action: Actions, subject: Subjects): boolean {
  const ability = defineAbilitiesFor(role)
  return ability.can(action, subject)
}

/**
 * Check if a user's role is in the explicit allowlist
 * Used as the allowedRoles gate for dashboard sidebar items and route protection.
 *
 * @param userRole - The current user's role
 * @param allowedRoles - Roles permitted to access the resource
 * @returns true if the role is in the allowlist
 */
export function hasAllowedRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole)
}

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
      can('manage', 'RoomTypes')
      can ('manage', 'Hotels')
      can ('update', 'HotelInformation')
      break
    case USER_ROLES.PROPERTY_MANAGER:
    case USER_ROLES.FRONT_DESK_STAFF:
    case USER_ROLES.HOUSEKEEPING_MANAGER:
    case USER_ROLES.HOUSEKEEPING_EMPLOYEE:
    case USER_ROLES.ACCOUNTANT:
      can('read', 'Agency')
      can('read', 'Hotels')
      break

    case USER_ROLES.PROPERTY_MANAGER:
      can('manage', 'Dashboard')
      can('manage', 'Users')
      can('manage', 'HotelManagement')
      can('manage', 'HotelSettings')
      can('manage', 'Rooms')
      can('manage', 'Operations')
      can('manage', 'Housekeeping')
      can('manage', 'HousekeepingTasks')
      can('manage', 'HousekeepingStaff')
      can('manage', 'Maintenance')
      can('manage', 'Insurance')
      can('manage', 'Finance')
      can('manage', 'Bookings')
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

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
export const USER_ROLES = ['admin', 'manager', 'agent', 'viewer'] as const

export type UserRole = (typeof USER_ROLES)[number]

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  manager: 'Manager',
  agent: 'Agent',
  viewer: 'Viewer'
}

export const USER_ROLE_OPTIONS: { value: UserRole; label: string }[] = USER_ROLES.map(role => ({
  value: role,
  label: USER_ROLE_LABELS[role]
}))

/**
 * Minimal user type for authorization checks
 */
export interface AuthUser {
  id: string
  role: UserRole
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

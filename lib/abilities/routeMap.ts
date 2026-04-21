import type { RoutePermission } from './types'

/**
 * Centralized route to permission mapping
 *
 * Pattern types supported:
 * - Exact: '/dashboard' matches only '/dashboard'
 * - Dynamic: '/users/[id]' matches '/users/123', '/users/abc'
 * - Wildcard: '/settings/*' matches '/settings/profile', '/settings/a/b/c'
 *
 * To add a new protected route:
 * 1. Add an entry here with the pattern, action, and subject
 * 2. That's it — middleware handles the rest
 */
export const routePermissions: RoutePermission[] = [
  // Home - accessible to all authenticated users
  {
    pattern: '/home',
    action: 'read',
    subject: 'Home',
    description: 'Home page for authenticated users'
  },
  {
    pattern: '/room-types',
    action: 'manage',
    subject: 'RoomTypes',
    description: 'Global room type catalog'
  },
  {
    pattern: '/hotels',
    action: 'read',
    subject: 'Hotels',
    description: 'Global hotel booking catalog'
  },
  {
    pattern: '/hotels/[hotelId]',
    action: 'read',
    subject: 'Hotels',
    description: 'Customer hotel details and rooms'
  },
  {
    pattern: '/reservations/[hotelId]/create',
    action: 'create',
    subject: 'Reservations',
    description: 'Hotel reservation creation page'
  }
]

/**
 * Public routes that don't require authentication
 * These bypass all auth checks
 */
export const publicRoutes: string[] = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/unauthorized',
  '/animations/showcase'
]

/**
 * Routes that only require authentication (any role can access)
 * No specific permission check needed
 */
export const authenticatedOnlyRoutes: string[] = ['/home', '/profile', '/dashboard/charts']

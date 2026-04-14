import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkAuthorization, isPublicRoute } from '@/lib/abilities'
import { USER_ROLES } from '@/lib/abilities'
import type { UserRole } from '@/lib/abilities'
import { authConfig } from './core/configs/clientConfig'
import { getCookie } from 'cookies-next/server'

/**
 * Cookie name for access token
 * Must match the value in clientConfig.ts
 */
const ACCESS_TOKEN_COOKIE = 'accessToken'

/**
 * Cookie name for user role
 * This role is stored after login/signup and used by middleware
 * to avoid decoding the JWT on every request
 */
const USER_ROLE_COOKIE = 'userRole'

/**
 * Routes that middleware should skip entirely
 * These are static assets and API routes handled elsewhere
 */
const SKIP_ROUTES = ['/_next', '/api', '/favicon.ico', '/locales', '/images']

/**
 * Extract user role from cookie
 *
 * Middleware can only access request data such as cookies and headers.
 * Since we do not want to decode the JWT here, the role is read directly
 * from the cookie set during authentication.
 *
 * @param request - Incoming Next.js request
 * @returns UserRole if valid, null otherwise
 */
async function getUserRoleFromCookie(request: NextRequest, response: NextResponse): Promise<UserRole | null> {
  const role = await getCookie(USER_ROLE_COOKIE, { req: request, res: response }) as UserRole | undefined

  if (role && Object.values(USER_ROLES).includes(role)) {
    return role
  }

  return null
}

/**
 * Next.js Middleware
 *
 * This is the primary enforcement point for authorization.
 * It runs before any page renders, on the Edge Runtime.
 *
 * Flow:
 * 1. Skip static assets and API routes
 * 2. Allow public routes without auth
 * 3. Extract session from cookies
 * 4. Check authorization
 * 5. Redirect if unauthorized
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Skip middleware for static assets and API routes
  if (SKIP_ROUTES.some(route => pathname.startsWith(route))) {
    return response
  }

  // Get token and role from cookies
  const token = await getCookie(ACCESS_TOKEN_COOKIE, { req: request, res: response }) as string | undefined
  const userRole = await getUserRoleFromCookie(request, response)

  // Redirect authenticated users away from login page
  if (token && userRole && pathname === '/login') {
    const homeUrl = new URL(authConfig.homePageURL, request.url)
    return NextResponse.redirect(homeUrl)
  }

  // Allow public routes without further checks
  if (isPublicRoute(pathname)) {
    return response
  }

  // Check authorization
  const result = checkAuthorization(pathname, userRole)

  if (result.authorized) {
    return response
  }

  // Handle unauthorized access
  if (result.reason === 'unauthenticated') {
    // Redirect to login with return URL
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('returnUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (result.reason === 'forbidden') {
    // Redirect to unauthorized page with context
    const unauthorizedUrl = new URL('/unauthorized', request.url)
    unauthorizedUrl.searchParams.set('from', pathname)
    if (result.requiredSubject) {
      unauthorizedUrl.searchParams.set('resource', result.requiredSubject)
    }
    if (result.requiredAction) {
      unauthorizedUrl.searchParams.set('action', result.requiredAction)
    }
    return NextResponse.redirect(unauthorizedUrl)
  }

  return response
}

/**
 * Middleware matcher configuration
 *
 * Excludes:
 * - _next/static (static files)
 * - _next/image (image optimization)
 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|mockServiceWorker.js).*)']
}

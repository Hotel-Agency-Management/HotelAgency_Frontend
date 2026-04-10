/**
 * MSW Auth Handlers
 *
 * Mock API handlers for authentication endpoints.
 * These simulate a real backend for development and testing.
 */

import { http, HttpResponse, delay } from 'msw'
import { findUserByEmail, createUser } from '../db'
import { createMockAccessToken, createMockRefreshToken, decodeMockToken } from '../jwt'
import type { UserRole } from '@/lib/abilities'

const API_BASE = '/api'

/**
 * Simulate network delay
 */
const SIMULATED_DELAY = 500

export const authHandlers = [
  /**
   * POST /api/auth/login
   */
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    await delay(SIMULATED_DELAY)

    const body = (await request.json()) as { email: string; password: string }

    if (!body.email || !body.password) {
      return HttpResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    const user = findUserByEmail(body.email)

    if (!user) {
      return HttpResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    if (user.password !== body.password) {
      return HttpResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    const accessToken = createMockAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      agencyName: user.agencyName,
      hotelId: user.hotelId
    })

    const refreshToken = createMockRefreshToken(user.id)

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user

    return HttpResponse.json({
      user: userWithoutPassword,
      accessToken,
      refreshToken
    })
  }),

  /**
   * POST /api/auth/signup
   */
  http.post(`${API_BASE}/auth/signup`, async ({ request }) => {
    await delay(SIMULATED_DELAY)

    type SignupBody = {
      email: string
      password: string
      name: string
      phone?: string
      companyName?: string
      type?: 'BUSINESS' | 'CUSTOMER'
      role?: UserRole
    }

    const contentType = request.headers.get('content-type') ?? ''

    let body: SignupBody

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()

      body = {
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
        name: String(formData.get('name') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        companyName: String(formData.get('companyName') ?? ''),
        type: (formData.get('type') as SignupBody['type']) ?? undefined,
        role: (formData.get('role') as UserRole | null) ?? undefined
      }
    } else {
      body = (await request.json()) as SignupBody
    }

    if (!body.email || !body.password || !body.name) {
      return HttpResponse.json({ message: 'Email, password, and name are required' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = findUserByEmail(body.email)
    if (existingUser) {
      return HttpResponse.json({ message: 'User with this email already exists' }, { status: 409 })
    }

    // Create new user (default role is 'viewer' for new signups)
    const newUser = createUser({
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role || 'CUSTOMER', // Allow role override for testing
      agencyName: body.role === 'PROPERTY_MANAGER' ? 'my-agency' : undefined,
      hotelId: body.role === 'PROPERTY_MANAGER' ? '1' : undefined,
      phone: body.phone || undefined,
      companyName: body.companyName || undefined,
      type: body.type
    })

    const accessToken = createMockAccessToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      agencyName: newUser.agencyName,
      hotelId: newUser.hotelId
    })

    const refreshToken = createMockRefreshToken(newUser.id)

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser

    return HttpResponse.json({
      user: userWithoutPassword,
      accessToken,
      refreshToken
    })
  }),

  /**
   * POST /api/auth/refresh
   */
  http.post(`${API_BASE}/auth/refresh`, async ({ request }) => {
    await delay(SIMULATED_DELAY)

    const body = (await request.json()) as { refreshToken: string }

    if (!body.refreshToken) {
      return HttpResponse.json({ message: 'Refresh token is required' }, { status: 400 })
    }

    const decoded = decodeMockToken(body.refreshToken)

    if (!decoded || decoded.exp * 1000 < Date.now()) {
      return HttpResponse.json({ message: 'Invalid or expired refresh token' }, { status: 401 })
    }

    // Find user by ID from token
    const { findUserById } = await import('../db')
    const user = findUserById(decoded.sub)

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 401 })
    }

    const accessToken = createMockAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      agencyName: user.agencyName,
      hotelId: user.hotelId
    })

    const refreshToken = createMockRefreshToken(user.id)

    return HttpResponse.json({
      accessToken,
      refreshToken
    })
  }),

  /**
   * POST /api/auth/logout
   */
  http.post(`${API_BASE}/auth/logout`, async () => {
    await delay(SIMULATED_DELAY / 2)

    // In a real app, you might invalidate the refresh token here
    return HttpResponse.json({ message: 'Logged out successfully' })
  }),

  /**
   * GET /api/auth/me
   */
  http.get(`${API_BASE}/auth/me`, async ({ request }) => {
    await delay(SIMULATED_DELAY / 2)

    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = decodeMockToken(token)

    if (!decoded || decoded.exp * 1000 < Date.now()) {
      return HttpResponse.json({ message: 'Token expired' }, { status: 401 })
    }

    const { findUserById } = await import('../db')
    const user = findUserById(decoded.sub)

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user

    return HttpResponse.json({ user: userWithoutPassword })
  })
]

/**
 * Mock Database for MSW
 *
 * Uses in-memory storage since MSW service workers don't have localStorage access.
 * This simulates a database for development/testing purposes.
 */

import type { UserRole } from '@/lib/abilities'
import type { HotelFormValues } from '@/app/(home)/agency/[agencyName]/hotels/types/hotel'
import { ProfileAgencyData } from '@/app/(home)/profile/types/profile'

export interface MockUser {
  id: string
  email: string
  password: string
  name: string
  role: UserRole
  agencyName?: string
  hotelId?: string
  agencyStatus? : 'incomplete' | 'pending' | 'approved' | 'rejected' // For agency owners
  phoneNumber?: string
  dateOfBirth?: string
  gender?: string
  bio?: string
  location?: string
  companyName?: string
  type?: 'BUSINESS' | 'CUSTOMER'
  agency?: ProfileAgencyData
  hotel?: HotelFormValues
  createdAt: string
}

/**
 * Default test users for each role
 */
const defaultUsers: MockUser[] = [
  {
    id: 'user_admin_001',
    email: 'admin@test.com',
    password: 'password123',
    name: 'Admin User',
    role: 'SUPER_ADMIN',
    agencyStatus: 'incomplete', // For testing incomplete agency flow
    bio: 'Platform administrator managing agencies, approvals, and overall system operations.',
    location: 'San Francisco, CA',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user_manager_001',
    email: 'manager@test.com',
    password: 'password123',
    name: 'Maya Bennett',
    role: 'AGENCY_OWNER',
    agencyName: 'my-agency',
    phoneNumber: '+1 555 000 1200',
    dateOfBirth: '1989-04-12',
    gender: 'female',
    bio: 'Leads agency operations, onboarding, and hotel performance across partner properties.',
    location: 'San Francisco, CA',
    companyName: 'Bright Horizons Agency',
    type: 'BUSINESS',
    agency: {
      name: 'Bright Horizons Agency',
      logo: null,
      phone: '+1 555 000 1234',
      country: 'USA',
      city: 'San Francisco',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user_agent_001',
    email: 'agent@test.com',
    password: 'password123',
    name: 'Nina Patel',
    role: 'CUSTOMER',
    phoneNumber: '+1 555 000 1220',
    dateOfBirth: '1995-09-21',
    gender: 'female',
    bio: 'Customer account used for testing guest-facing flows and booking experiences.',
    location: 'New York, NY',
    type: 'CUSTOMER',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user_viewer_001',
    email: 'viewer@test.com',
    password: 'password123',
    name: 'Viewer User',
    role: 'PROPERTY_MANAGER',
    agencyName: 'my-agency',
    hotelId: '1',
    createdAt: new Date().toISOString()
  }
]

// In-memory database (works in service worker context)
let usersDb: MockUser[] = [...defaultUsers]

/**
 * Get all users from mock database
 */
export function getUsers(): MockUser[] {
  return usersDb
}

/**
 * Find user by email
 */
export function findUserByEmail(email: string): MockUser | undefined {
  return usersDb.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

/**
 * Find user by ID
 */
export function findUserById(id: string): MockUser | undefined {
  return usersDb.find((u) => u.id === id)
}

/**
 * Create a new user
 */
export function createUser(userData: Omit<MockUser, 'id' | 'createdAt'>): MockUser {
  const newUser: MockUser = {
    ...userData,
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
    createdAt: new Date().toISOString(),
  }

  usersDb.push(newUser)
  return newUser
}

/**
 * Update user
 */
export function updateUser(id: string, updates: Partial<MockUser>): MockUser | null {
  const index = usersDb.findIndex((u) => u.id === id)

  if (index === -1) return null

  usersDb[index] = { ...usersDb[index], ...updates }
  return usersDb[index]
}

/**
 * Delete user
 */
export function deleteUser(id: string): boolean {
  const initialLength = usersDb.length
  usersDb = usersDb.filter((u) => u.id !== id)
  return usersDb.length !== initialLength
}

/**
 * Reset database to default users
 */
export function resetDatabase(): void {
  usersDb = [...defaultUsers]
}

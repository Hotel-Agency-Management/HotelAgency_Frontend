export const USER_ROLES = {
  AGENCY_OWNER: 'agencyOwner',
  SUPER_ADMIN: 'superAdmin',
  CUSTOMER : 'customer',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export const AGENCY_STATUS = {
  INCOMPLETE: 'incomplete',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PENDING: 'pending',
} as const

export type AgencyStatus =
  typeof AGENCY_STATUS[keyof typeof AGENCY_STATUS]

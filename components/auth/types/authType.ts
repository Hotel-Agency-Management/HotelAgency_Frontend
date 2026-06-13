export { USER_ROLES } from '@/lib/abilities'
export type { UserRole } from '@/lib/abilities'

export const AGENCY_STATUS = {
  INCOMPLETE: 'InComplete',
  APPROVED: 'Active',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
} as const

export type AgencyStatus =
  typeof AGENCY_STATUS[keyof typeof AGENCY_STATUS]

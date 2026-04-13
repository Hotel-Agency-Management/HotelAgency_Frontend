export const AGENCY_STATUS = {
  INCOMPLETE: 'InComplete',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
} as const

export type AgencyStatus =
  typeof AGENCY_STATUS[keyof typeof AGENCY_STATUS]

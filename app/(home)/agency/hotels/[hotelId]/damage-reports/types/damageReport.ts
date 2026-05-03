export const DAMAGE_REPORT_STATUS = {
  REPORTED: 'REPORTED',
  PENDING_REVIEW: 'PENDING_REVIEW',
  ESCALATED: 'ESCALATED',
  INSURED: 'INSURED',
  INVOICED: 'INVOICED',
} as const

export const DAMAGE_SEVERITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const

export type DamageReportStatus =
  (typeof DAMAGE_REPORT_STATUS)[keyof typeof DAMAGE_REPORT_STATUS]

export type DamageSeverity =
  (typeof DAMAGE_SEVERITY)[keyof typeof DAMAGE_SEVERITY]

export interface DamageReport {
  id: string
  hotelId: string
  roomNumber: string
  taskId: string
  reservationId?: string
  reportedBy: string
  description: string
  severity: DamageSeverity
  estimatedCost: number
  currency: string
  status: DamageReportStatus
  hasInsurance?: boolean
  createdAt: string
  escalatedAt?: string
  resolvedAt?: string
}

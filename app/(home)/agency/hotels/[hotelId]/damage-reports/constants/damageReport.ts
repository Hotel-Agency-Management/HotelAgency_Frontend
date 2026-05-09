import type { Palette } from '@mui/material/styles'
import { DAMAGE_REPORT_STATUS, DAMAGE_SEVERITY, type DamageReportStatus, type DamageSeverity } from '../types/damageReport'

export type PaletteColorKey = keyof Pick<Palette, 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>

export const DAMAGE_STATUS_LABELS: Record<DamageReportStatus, string> = {
  [DAMAGE_REPORT_STATUS.REPORTED]: 'Reported',
  [DAMAGE_REPORT_STATUS.PENDING_REVIEW]: 'Pending Review',
  [DAMAGE_REPORT_STATUS.ESCALATED]: 'Escalated',
  [DAMAGE_REPORT_STATUS.INSURED]: 'Covered by Insurance',
  [DAMAGE_REPORT_STATUS.INVOICED]: 'Invoiced',
}

export const DAMAGE_STATUS_COLOR_KEY: Record<DamageReportStatus, PaletteColorKey> = {
  [DAMAGE_REPORT_STATUS.REPORTED]: 'secondary',
  [DAMAGE_REPORT_STATUS.PENDING_REVIEW]: 'warning',
  [DAMAGE_REPORT_STATUS.ESCALATED]: 'error',
  [DAMAGE_REPORT_STATUS.INSURED]: 'success',
  [DAMAGE_REPORT_STATUS.INVOICED]: 'info',
}

export const DAMAGE_SEVERITY_LABELS: Record<DamageSeverity, string> = {
  [DAMAGE_SEVERITY.LOW]: 'Low',
  [DAMAGE_SEVERITY.MEDIUM]: 'Medium',
  [DAMAGE_SEVERITY.HIGH]: 'High',
}

export const DAMAGE_SEVERITY_COLOR_KEY: Record<DamageSeverity, PaletteColorKey> = {
  [DAMAGE_SEVERITY.LOW]: 'success',
  [DAMAGE_SEVERITY.MEDIUM]: 'warning',
  [DAMAGE_SEVERITY.HIGH]: 'error',
}

export const DAMAGE_SEVERITY_OPTIONS = [
  { value: DAMAGE_SEVERITY.LOW, label: DAMAGE_SEVERITY_LABELS[DAMAGE_SEVERITY.LOW] },
  { value: DAMAGE_SEVERITY.MEDIUM, label: DAMAGE_SEVERITY_LABELS[DAMAGE_SEVERITY.MEDIUM] },
  { value: DAMAGE_SEVERITY.HIGH, label: DAMAGE_SEVERITY_LABELS[DAMAGE_SEVERITY.HIGH] },
]

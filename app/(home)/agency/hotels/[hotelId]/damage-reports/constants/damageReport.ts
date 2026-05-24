import type { TFunction } from 'i18next'
import type { Palette } from '@mui/material/styles'
import { DAMAGE_REPORT_STATUS, DAMAGE_SEVERITY, type DamageReportStatus, type DamageSeverity } from '../types/damageReport'

export type PaletteColorKey = keyof Pick<Palette, 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'>

export function getDamageStatusLabels(t: TFunction): Record<DamageReportStatus, string> {
  return {
    [DAMAGE_REPORT_STATUS.REPORTED]: t('damageReports.status.Reported', 'Reported'),
    [DAMAGE_REPORT_STATUS.PENDING_REVIEW]: t('damageReports.status.PendingReview', 'Pending Review'),
    [DAMAGE_REPORT_STATUS.ESCALATED]: t('damageReports.status.Escalated', 'Escalated'),
    [DAMAGE_REPORT_STATUS.INSURED]: t('damageReports.status.Insured', 'Covered by Insurance'),
    [DAMAGE_REPORT_STATUS.INVOICED]: t('damageReports.status.Invoiced', 'Invoiced'),
  }
}

export function getDamageSeverityLabels(t: TFunction): Record<DamageSeverity, string> {
  return {
    [DAMAGE_SEVERITY.LOW]: t('damageReports.severityLabels.LOW', 'Low'),
    [DAMAGE_SEVERITY.MEDIUM]: t('damageReports.severityLabels.MEDIUM', 'Medium'),
    [DAMAGE_SEVERITY.HIGH]: t('damageReports.severityLabels.HIGH', 'High'),
  }
}

export function getDamageSeverityOptions(t: TFunction) {
  const labels = getDamageSeverityLabels(t)
  return [
    { value: DAMAGE_SEVERITY.LOW, label: labels[DAMAGE_SEVERITY.LOW] },
    { value: DAMAGE_SEVERITY.MEDIUM, label: labels[DAMAGE_SEVERITY.MEDIUM] },
    { value: DAMAGE_SEVERITY.HIGH, label: labels[DAMAGE_SEVERITY.HIGH] },
  ]
}

/** @deprecated Use getDamageStatusLabels(t) for translated labels. */
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

/** @deprecated Use getDamageSeverityLabels(t) for translated labels. */
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

/** @deprecated Use getDamageSeverityOptions(t) for translated options. */
export const DAMAGE_SEVERITY_OPTIONS = [
  { value: DAMAGE_SEVERITY.LOW, label: DAMAGE_SEVERITY_LABELS[DAMAGE_SEVERITY.LOW] },
  { value: DAMAGE_SEVERITY.MEDIUM, label: DAMAGE_SEVERITY_LABELS[DAMAGE_SEVERITY.MEDIUM] },
  { value: DAMAGE_SEVERITY.HIGH, label: DAMAGE_SEVERITY_LABELS[DAMAGE_SEVERITY.HIGH] },
]

'use client'

import { useState } from 'react'
import { DAMAGE_REPORT_STATUS, type DamageReport, type DamageSeverity } from '../types/damageReport'
import { mockDamageReports } from '../data/mockDamageReports'

export interface ReportDamageInput {
  hotelId: string
  roomNumber: string
  taskId: string
  reservationId?: string
  reportedBy: string
  description: string
  severity: DamageSeverity
  estimatedCost: number
  currency: string
  hasInsurance?: boolean
}

export function useDamageReports(hotelId: string) {
  const [reports, setReports] = useState<DamageReport[]>(
    mockDamageReports.filter(r => r.hotelId === hotelId)
  )

  function reportDamage(input: ReportDamageInput): DamageReport {
    const report: DamageReport = {
      ...input,
      id: `dmg-${crypto.randomUUID()}`,
      status: DAMAGE_REPORT_STATUS.REPORTED,
      createdAt: new Date().toISOString(),
    }
    setReports(prev => [report, ...prev])
    return report
  }

  function escalateReport(reportId: string) {
    setReports(prev =>
      prev.map(r =>
        r.id === reportId
          ? { ...r, status: DAMAGE_REPORT_STATUS.ESCALATED, escalatedAt: new Date().toISOString() }
          : r
      )
    )
  }

  function markAsInsured(reportId: string) {
    setReports(prev =>
      prev.map(r =>
        r.id === reportId
          ? { ...r, status: DAMAGE_REPORT_STATUS.INSURED, resolvedAt: new Date().toISOString() }
          : r
      )
    )
  }

  function markAsInvoiced(reportId: string) {
    setReports(prev =>
      prev.map(r =>
        r.id === reportId
          ? { ...r, status: DAMAGE_REPORT_STATUS.INVOICED, resolvedAt: new Date().toISOString() }
          : r
      )
    )
  }

  return {
    reports,
    reportDamage,
    escalateReport,
    markAsInsured,
    markAsInvoiced,
  }
}

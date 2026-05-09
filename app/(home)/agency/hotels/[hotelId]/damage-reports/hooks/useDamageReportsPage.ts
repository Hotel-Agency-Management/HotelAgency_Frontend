'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '@/core/context/AuthContext'
import { useAbility } from '@/core/hooks/useAbility'
import { useHotelStore } from '../../../hooks/useHotelStore'
import { useDamageReports } from './useDamageReports'
import { DAMAGE_REPORT_STATUS } from '../types/damageReport'
import type { DamageReport } from '../types/damageReport'

export function useDamageReportsPage() {
  const params = useParams<{ hotelId?: string }>()
  const theme = useTheme()
  const { user } = useAuth()
  const ability = useAbility()

  const numericHotelId = params.hotelId ? Number(params.hotelId) : undefined
  const { hotel } = useHotelStore(
    user?.agencyId,
    Number.isFinite(numericHotelId) ? numericHotelId : undefined
  )

  const hotelIdStr = params.hotelId ?? ''
  const hotelName = hotel?.basicInfo.name ?? 'Hotel'
  const hotelLogo = hotel?.branding.logo ?? null
  const hotelPrimaryColor = hotel?.branding.colors?.primary ?? theme.palette.primary.main
  const hotelSecondaryColor = hotel?.branding.colors?.secondary

  const { reports, escalateReport, markAsInsured, markAsInvoiced } = useDamageReports(hotelIdStr)

  const [escalateTarget, setEscalateTarget] = useState<DamageReport | null>(null)
  const [resolveTarget, setResolveTarget] = useState<DamageReport | null>(null)
  const [invoiceTarget, setInvoiceTarget] = useState<DamageReport | null>(null)

  const isManager = ability.can('manage', 'DamageReports')
  const isFrontDesk = ability.can('manage', 'DamageInvoices')

  const visibleReports = isFrontDesk && !isManager
    ? reports.filter(r => r.status === DAMAGE_REPORT_STATUS.ESCALATED)
    : reports

  return {
    reports,
    visibleReports,
    hotelName,
    hotelLogo,
    hotelPrimaryColor,
    hotelSecondaryColor,
    escalateTarget,
    resolveTarget,
    invoiceTarget,
    setEscalateTarget,
    setResolveTarget,
    setInvoiceTarget,
    escalateReport,
    markAsInsured,
    markAsInvoiced,
  }
}

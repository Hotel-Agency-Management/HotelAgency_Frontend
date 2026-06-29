'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toExcelRows } from '../utils/toExcelRows'
import { usePaymentLogsQuery } from './queries/usePaymentLogsQuery'
import { usePaymentLogDetailsQuery } from './queries/usePaymentLogDetailsQuery'
import { usePaymentLogsFilters } from './usePaymentLogsFilters'
import type { PaymentLogExcelRow } from '../config/paymentLogsConfig'
import type { PaymentViewMode } from '../types/payment'

export function usePaymentLogs(hotelId: string) {
  const { t } = useTranslation()
  const core = usePaymentLogsFilters()
  const [viewMode, setViewMode] = useState<PaymentViewMode>('feed')
  const [excelRows, setExcelRows] = useState<PaymentLogExcelRow[]>([])

  const query = usePaymentLogsQuery(hotelId, {
    pageNumber: core.pageNumber,
    pageSize: core.pageSize,
    ...(core.filters.search ? { search: core.filters.search } : {}),
    ...(core.filters.transactionType ? { transactionType: core.filters.transactionType } : {}),
    ...(core.filters.type ? { type: core.filters.type } : {}),
  })
  const detailsQuery = usePaymentLogDetailsQuery(hotelId, core.selectedPaymentId ?? undefined)

  useEffect(() => {
    setExcelRows(toExcelRows(query.data?.groups ?? [], t))
  }, [query.data, t])

  function handleViewModeChange(mode: PaymentViewMode) {
    setViewMode(mode)
  }

  function handleExcelRowsChange(rows: PaymentLogExcelRow[]) {
    setExcelRows(rows)
  }

  return {
    ...core,
    query,
    detailsQuery,
    viewMode,
    handleViewModeChange,
    excelRows,
    handleExcelRowsChange,
  }
}

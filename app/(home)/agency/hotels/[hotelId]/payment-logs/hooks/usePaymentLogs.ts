'use client'

import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_FILTERS } from '../constants/paymentLogsConstants'
import { toExcelRows } from '../utils/toExcelRows'
import { usePaymentLogsQuery } from './queries/usePaymentLogsQuery'
import { usePaymentLogDetailsQuery } from './queries/usePaymentLogDetailsQuery'
import type { PaymentLogExcelRow, PaymentLogItem } from '../config/paymentLogsConfig'
import type { PaymentLogsFilters, PaymentViewMode } from '../types/payment'

export function usePaymentLogs(hotelId: string) {
  const [filters, setFilters] = useState<PaymentLogsFilters>(DEFAULT_FILTERS)
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [viewMode, setViewMode] = useState<PaymentViewMode>('feed')
  const [excelRows, setExcelRows] = useState<PaymentLogExcelRow[]>([])

  const query = usePaymentLogsQuery(hotelId, {
    pageNumber,
    pageSize,
    ...(filters.search ? { search: filters.search } : {}),
    ...(filters.transactionType ? { transactionType: filters.transactionType } : {}),
    ...(filters.type ? { type: filters.type } : {}),
  })
  const detailsQuery = usePaymentLogDetailsQuery(hotelId, selectedPaymentId ?? undefined)

  function updateFilter<K extends keyof PaymentLogsFilters>(key: K, value: PaymentLogsFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPageNumber(1)
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
    setPageNumber(1)
  }

  const hasActiveFilters = useMemo(
    () => filters.search !== '' || filters.transactionType !== '' || filters.type !== '',
    [filters]
  )

  useEffect(() => {
    setExcelRows(toExcelRows(query.data?.groups ?? []))
  }, [query.data])

  function handleSelectPayment(payment: PaymentLogItem) {
    setSelectedPaymentId(payment.paymentId)
  }

  function handleCloseDrawer() {
    setSelectedPaymentId(null)
  }

  function handleViewModeChange(mode: PaymentViewMode) {
    setViewMode(mode)
  }

  function handleExcelRowsChange(rows: PaymentLogExcelRow[]) {
    setExcelRows(rows)
  }

  function handlePageSizeChange(size: number) {
    setPageSize(size)
    setPageNumber(1)
  }

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    selectedPaymentId,
    handleSelectPayment,
    handleCloseDrawer,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize: handlePageSizeChange,
    query,
    detailsQuery,
    viewMode,
    handleViewModeChange,
    excelRows,
    handleExcelRowsChange,
  }
}

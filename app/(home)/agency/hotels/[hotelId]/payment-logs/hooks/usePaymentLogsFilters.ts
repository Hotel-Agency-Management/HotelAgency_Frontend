'use client'

import { useMemo, useState } from 'react'
import { DEFAULT_FILTERS } from '../constants/paymentLogsConstants'
import type { PaymentLogItem } from '../config/paymentLogsConfig'
import type { PaymentLogsFilters } from '../types/payment'

export function usePaymentLogsFilters() {
  const [filters, setFilters] = useState<PaymentLogsFilters>(DEFAULT_FILTERS)
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const hasActiveFilters = useMemo(
    () => filters.search !== '' || filters.transactionType !== '' || filters.type !== '',
    [filters]
  )

  function updateFilter<K extends keyof PaymentLogsFilters>(key: K, value: PaymentLogsFilters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPageNumber(1)
    setSelectedPaymentId(null)
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
    setPageNumber(1)
    setSelectedPaymentId(null)
  }

  function handleSelectPayment(payment: PaymentLogItem) {
    setSelectedPaymentId(payment.paymentId)
  }

  function handleCloseDrawer() {
    setSelectedPaymentId(null)
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
  }
}

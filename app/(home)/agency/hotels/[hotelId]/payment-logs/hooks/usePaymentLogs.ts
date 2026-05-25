'use client'

import { useState, useEffect } from 'react'
import { useIncomingPaymentsQuery } from './queries/useIncomingPaymentsQuery'
import { useOutgoingPaymentsQuery } from './queries/useOutgoingPaymentsQuery'
import { usePaymentLogDetailsQuery } from './queries/usePaymentLogDetailsQuery'
import type { PaymentLogItem, PaymentLogExcelRow } from '../config/paymentLogsConfig'
import type { PaymentViewMode } from '../types/payment'
import { toExcelRows } from '../utils/toExcelRows'

export function usePaymentLogs(hotelId: string) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null)
  const [incomingPageNumber, setIncomingPageNumber] = useState(1)
  const [outgoingPageNumber, setOutgoingPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [viewMode, setViewMode] = useState<PaymentViewMode>('feed')
  const [excelRows, setExcelRows] = useState<PaymentLogExcelRow[]>([])

  const incomingQuery = useIncomingPaymentsQuery(hotelId, { pageNumber: incomingPageNumber, pageSize })
  const outgoingQuery = useOutgoingPaymentsQuery(hotelId, { pageNumber: outgoingPageNumber, pageSize })
  const detailsQuery = usePaymentLogDetailsQuery(hotelId, selectedPaymentId ?? undefined)

  const isIncoming = activeTab === 0
  const activeQuery = isIncoming ? incomingQuery : outgoingQuery
  const activePage = isIncoming ? incomingPageNumber : outgoingPageNumber
  const setActivePage = isIncoming ? setIncomingPageNumber : setOutgoingPageNumber

  useEffect(() => {
    const groups = activeQuery.data?.groups ?? []
    const direction = activeTab === 0 ? 'Incoming' : 'Outgoing'
    setExcelRows(toExcelRows(groups, direction))
  }, [activeQuery.data, activeTab])

  function handleTabChange(_: React.SyntheticEvent, value: number) {
    setActiveTab(value)
    setSelectedPaymentId(null)
  }

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

  return {
    activeTab,
    handleTabChange,
    selectedPaymentId,
    handleSelectPayment,
    handleCloseDrawer,
    activePage,
    setActivePage,
    pageSize,
    setPageSize,
    incomingQuery,
    outgoingQuery,
    activeQuery,
    detailsQuery,
    viewMode,
    handleViewModeChange,
    excelRows,
    handleExcelRowsChange,
  }
}

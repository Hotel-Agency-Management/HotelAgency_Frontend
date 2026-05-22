'use client'

import { useState } from 'react'
import { useIncomingPaymentsQuery } from './queries/useIncomingPaymentsQuery'
import { useOutgoingPaymentsQuery } from './queries/useOutgoingPaymentsQuery'
import { usePaymentLogDetailsQuery } from './queries/usePaymentLogDetailsQuery'
import type { PaymentLogItem } from '../config/paymentLogsConfig'

export function usePaymentLogs(hotelId: string) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null)
  const [incomingPageNumber, setIncomingPageNumber] = useState(1)
  const [outgoingPageNumber, setOutgoingPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const incomingQuery = useIncomingPaymentsQuery(hotelId, { pageNumber: incomingPageNumber, pageSize })
  const outgoingQuery = useOutgoingPaymentsQuery(hotelId, { pageNumber: outgoingPageNumber, pageSize })
  const detailsQuery = usePaymentLogDetailsQuery(hotelId, selectedPaymentId ?? undefined)

  const isIncoming = activeTab === 0
  const activeQuery = isIncoming ? incomingQuery : outgoingQuery
  const activePage = isIncoming ? incomingPageNumber : outgoingPageNumber
  const setActivePage = isIncoming ? setIncomingPageNumber : setOutgoingPageNumber

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
  }
}

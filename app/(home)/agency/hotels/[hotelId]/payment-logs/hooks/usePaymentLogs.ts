'use client'

import { useState } from 'react'
import { useIncomingPaymentsQuery } from './queries/useIncomingPaymentsQuery'
import { useOutgoingPaymentsQuery } from './queries/useOutgoingPaymentsQuery'
import type { PaymentLog } from '../types'

export function usePaymentLogs(hotelId: string) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedPayment, setSelectedPayment] = useState<PaymentLog | null>(null)
  const [incomingPage, setIncomingPage] = useState(1)
  const [outgoingPage, setOutgoingPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const incomingQuery = useIncomingPaymentsQuery(hotelId, { page: incomingPage, pageSize })
  const outgoingQuery = useOutgoingPaymentsQuery(hotelId, { page: outgoingPage, pageSize })

  const isIncoming = activeTab === 0
  const activeQuery = isIncoming ? incomingQuery : outgoingQuery
  const activePage = isIncoming ? incomingPage : outgoingPage
  const setActivePage = isIncoming ? setIncomingPage : setOutgoingPage

  function handleTabChange(_: React.SyntheticEvent, value: number) {
    setActiveTab(value)
    setSelectedPayment(null)
  }

  function handleSelectPayment(payment: PaymentLog) {
    setSelectedPayment(payment)
  }

  function handleCloseDrawer() {
    setSelectedPayment(null)
  }

  return {
    activeTab,
    handleTabChange,
    selectedPayment,
    handleSelectPayment,
    handleCloseDrawer,
    activePage,
    setActivePage,
    pageSize,
    setPageSize,
    incomingQuery,
    outgoingQuery,
    activeQuery,
  }
}

'use client'

import { useState } from 'react'
import type { PaymentLogItem } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'
import { useAdminIncomingPaymentsQuery } from './queries/useAdminIncomingPaymentsQuery'
import { useAdminOutgoingPaymentsQuery } from './queries/useAdminOutgoingPaymentsQuery'
import { useAdminPaymentLogDetailsQuery } from './queries/useAdminPaymentLogDetailsQuery'

export function useAdminPaymentLogs(agencyId: string, hotelId: string) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null)
  const [incomingPageNumber, setIncomingPageNumber] = useState(1)
  const [outgoingPageNumber, setOutgoingPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const incomingQuery = useAdminIncomingPaymentsQuery(agencyId, hotelId, {
    pageNumber: incomingPageNumber,
    pageSize,
  })
  const outgoingQuery = useAdminOutgoingPaymentsQuery(agencyId, hotelId, {
    pageNumber: outgoingPageNumber,
    pageSize,
  })
  const detailsQuery = useAdminPaymentLogDetailsQuery(agencyId, hotelId, selectedPaymentId ?? undefined)

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

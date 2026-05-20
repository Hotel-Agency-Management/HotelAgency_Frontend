'use client'

import { useState } from 'react'
import type { PaymentLog } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/types'
import type { AdminHotel } from '../api/adminPaymentLogsApi'
import { useAdminIncomingPaymentsQuery } from './queries/useAdminIncomingPaymentsQuery'
import { useAdminOutgoingPaymentsQuery } from './queries/useAdminOutgoingPaymentsQuery'
import { useAdminHotelsQuery } from './queries/useAdminHotelsQuery'

export function useAdminPaymentLogs() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedPayment, setSelectedPayment] = useState<PaymentLog | null>(null)
  const [selectedHotel, setSelectedHotel] = useState<AdminHotel | null>(null)
  const [incomingPage, setIncomingPage] = useState(1)
  const [outgoingPage, setOutgoingPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const hotelId = selectedHotel?.id ?? null

  const incomingQuery = useAdminIncomingPaymentsQuery({ page: incomingPage, pageSize, hotelId })
  const outgoingQuery = useAdminOutgoingPaymentsQuery({ page: outgoingPage, pageSize, hotelId })
  const hotelsQuery = useAdminHotelsQuery()

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

  function handleHotelChange(hotel: AdminHotel | null) {
    setSelectedHotel(hotel)
    setIncomingPage(1)
    setOutgoingPage(1)
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
    hotelsQuery,
    selectedHotel,
    handleHotelChange,
  }
}

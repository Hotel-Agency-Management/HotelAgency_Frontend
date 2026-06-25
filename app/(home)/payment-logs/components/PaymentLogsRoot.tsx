'use client'

import { useAuth } from '@/core/context/AuthContext'
import { USER_ROLES } from '@/lib/abilities'
import { AdminPaymentLogsPage } from './AdminPaymentLogsPage'
import { OwnerPaymentLogsPage } from './OwnerPaymentLogsPage'

export function PaymentLogsRoot() {
  const { user } = useAuth()

  if (user?.role === USER_ROLES.SUPER_ADMIN) {
    return <AdminPaymentLogsPage />
  }

  return <OwnerPaymentLogsPage />
}

'use client'

import { Stack } from '@mui/material'
import { PaymentCard } from './PaymentCard'
import { PaymentSkeletonCard } from './PaymentSkeletonCard'
import { PaymentEmptyState } from './PaymentEmptyState'
import { DateGroupHeader } from '../styles/StyledComponents'
import { formatPaymentWeekLabel, getPaymentWeekStart, parseApiDate } from '../utils/dateFormat'
import type { PaymentLogsGroup, PaymentLogItem } from '../config/paymentLogsConfig'

interface PaymentFeedProps {
  groups: PaymentLogsGroup[]
  selectedId: number | null
  isLoading: boolean
  onSelect: (payment: PaymentLogItem) => void
}

export function PaymentFeed({ groups, selectedId, isLoading, onSelect }: PaymentFeedProps) {
  if (isLoading) {
    return (
      <Stack gap={1.5}>
        {Array.from({ length: 5 }).map((_, index) => (
          <PaymentSkeletonCard key={index} />
        ))}
      </Stack>
    )
  }

  const hasItems = groups.some((g) => g.items.length > 0)
  if (!hasItems) return <PaymentEmptyState />

  return (
    <Stack gap={2}>
      {groups.map(({ weekStart, weekEnd, items }) => {
        const label = weekStart
          ? formatPaymentWeekLabel(getPaymentWeekStart(parseApiDate(weekStart)))
          : weekEnd
            ? formatPaymentWeekLabel(getPaymentWeekStart(parseApiDate(weekEnd)))
            : 'This Week'
        return (
          <Stack key={weekStart || weekEnd} gap={1}>
            <DateGroupHeader>{label}</DateGroupHeader>
            <Stack gap={1.5}>
              {items.map((payment) => (
                <PaymentCard
                  key={payment.paymentId}
                  payment={payment}
                  selected={payment.paymentId === selectedId}
                  onClick={onSelect}
                />
              ))}
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}

'use client'

import { Stack } from '@mui/material'
import { PaymentCard } from './PaymentCard'
import { PaymentSkeletonCard } from './PaymentSkeletonCard'
import { PaymentEmptyState } from './PaymentEmptyState'
import { DateGroupHeader } from '../styles/StyledComponents'
import { groupByWeek } from '../utils/groupByWeek'
import type { PaymentLog } from '../types'

interface PaymentFeedProps {
  payments: PaymentLog[]
  selectedId: number | null
  isIncoming: boolean
  isLoading: boolean
  onSelect: (payment: PaymentLog) => void
}

export function PaymentFeed({ payments, selectedId, isIncoming, isLoading, onSelect }: PaymentFeedProps) {
  if (isLoading) {
    return (
      <Stack gap={1.5}>
        {Array.from({ length: 5 }).map((_, index) => (
          <PaymentSkeletonCard key={index} />
        ))}
      </Stack>
    )
  }

  if (!payments.length) return <PaymentEmptyState />

  const groups = groupByWeek(payments)

  return (
    <Stack gap={2}>
      {groups.map(({ key, label, items }) => (
        <Stack key={key} gap={1}>
          <DateGroupHeader>{label}</DateGroupHeader>
          <Stack gap={1.5}>
            {items.map((payment) => (
              <PaymentCard
                key={payment.id}
                payment={payment}
                selected={payment.id === selectedId}
                isIncoming={isIncoming}
                onClick={onSelect}
              />
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

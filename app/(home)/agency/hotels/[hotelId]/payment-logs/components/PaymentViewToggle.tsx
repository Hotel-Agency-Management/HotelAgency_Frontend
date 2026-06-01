'use client'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import { LayoutList, Table2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { PaymentViewMode, PaymentViewToggleProps } from '../types/payment'

export function PaymentViewToggle({ value, onChange }: PaymentViewToggleProps) {
  const { t } = useTranslation()
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, nextValue: PaymentViewMode | null) => {
        if (nextValue !== null) onChange(nextValue)
      }}
      size="small"
    >
      <ToggleButton value="feed">
        <Tooltip title={t('hotelPaymentLogs.viewMode.feed', 'Feed view')} placement="top">
          <LayoutList size={15} />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="excel">
        <Tooltip title={t('hotelPaymentLogs.viewMode.excel', 'Excel mode')} placement="top">
          <Table2 size={15} />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

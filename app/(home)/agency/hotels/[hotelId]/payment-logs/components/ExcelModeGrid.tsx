'use client'

import { DataSheetGrid } from 'react-datasheet-grid'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Spinner from '@/components/loaders/Spinner'
import { getExcelColumns } from '../constants/excelColumns'
import type { PaymentLogExcelRow } from '../config/paymentLogsConfig'

interface ExcelModeGridProps {
  rows: PaymentLogExcelRow[]
  onChange: (rows: PaymentLogExcelRow[]) => void
  isLoading: boolean
}

export function ExcelModeGrid({ rows, onChange, isLoading }: ExcelModeGridProps) {
  const { t } = useTranslation()
  const columns = getExcelColumns(t)

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight={300}>
        <Spinner />
      </Stack>
    )
  }

  if (rows.length === 0) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight={300} gap={1}>
        <Typography variant="body1" fontWeight={600}>
          {t('hotelPaymentLogs.empty.title', 'No transactions found')}
        </Typography>
        <Typography variant="body2">
          {t('hotelPaymentLogs.empty.subtitle', 'There are no payment records for this period.')}
        </Typography>
      </Stack>
    )
  }

  return (
      <DataSheetGrid<PaymentLogExcelRow>
        value={rows}
        onChange={onChange}
        columns={columns}
        rowHeight={36}
        headerRowHeight={38}
        gutterColumn={false}
        disableExpandSelection
      />
  )
}

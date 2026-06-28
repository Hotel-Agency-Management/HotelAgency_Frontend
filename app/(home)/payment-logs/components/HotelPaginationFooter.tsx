'use client'

import { MenuItem, Pagination, PaginationItem, Select, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import { HOTEL_GRID_PAGE_SIZE_OPTIONS } from '../constants/adminPaymentLogsConstants'

interface HotelPaginationFooterProps {
  totalCount: number
  totalPages: number
  pageNumber: number
  onPageChange: (page: number) => void
  pageSize: number
  onPageSizeChange: (size: number) => void
}

export function HotelPaginationFooter({
  totalCount,
  totalPages,
  pageNumber,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: HotelPaginationFooterProps) {
  const { t } = useTranslation()

  if (totalCount === 0) return null

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={1}>
      <Typography variant="caption" color="text.secondary" flexShrink={0}>
        {t('paymentLogs.hotels.results', {
          count: totalCount,
          defaultValue: '{{count}} hotels',
        })}
      </Typography>
      <Stack flex={1} alignItems="center">
        <Pagination
          count={totalPages}
          page={pageNumber}
          onChange={(_, page) => onPageChange(page)}
          color="primary"
          shape="rounded"
          size="small"
          renderItem={(item) => (
            <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
          )}
        />
      </Stack>
      <Select
        size="small"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        sx={{ fontSize: 13 }}
      >
        {HOTEL_GRID_PAGE_SIZE_OPTIONS.map((n) => (
          <MenuItem key={n} value={n}>
            {t('paymentLogs.perPage', { count: n, defaultValue: '{{count}} per page' })}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  )
}

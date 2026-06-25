'use client'

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import SearchInput from '@/components/common/SearchInput'
import { PaymentFeed } from './PaymentFeed'
import { PaymentDetailsDrawer } from './PaymentDetailsDrawer'
import { PaymentSummaryHeader } from './PaymentSummaryHeader'
import { PaymentViewToggle } from './PaymentViewToggle'
import { ExcelModeGrid } from './ExcelModeGrid'
import { usePaymentLogs } from '../hooks/usePaymentLogs'
import { PAGE_SIZE_OPTIONS, PAYMENT_TYPE_OPTIONS } from '../constants/paymentLogsConstants'
import { PAYMENT_TYPE_CONFIG } from '../constants/paymentTypeConfig'
import { PAYMENT_DIRECTION_CONFIG } from '../constants/paymentDirectionConfig'
import { FiltersCard } from '../styles/StyledComponents'
import type { PaymentDirection, PaymentType } from '../types/payment'

interface PaymentLogsPageProps {
  hotelId: string
}

export function PaymentLogsPage({ hotelId }: PaymentLogsPageProps) {
  const {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    selectedPaymentId,
    handleSelectPayment,
    handleCloseDrawer,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    query,
    detailsQuery,
    viewMode,
    handleViewModeChange,
    excelRows,
    handleExcelRowsChange,
  } = usePaymentLogs(hotelId)

  const { t } = useTranslation()
  const data = query.data
  const totalPages = data?.totalPages ?? 0

  return (
    <Stack gap={3}>
      <Stack gap={0.5}>
        <Typography variant="h5" fontWeight={700}>
          {t("hotelPaymentLogs.title", "Payment Logs")}
        </Typography>
        <Typography variant="body2">
          {t("hotelPaymentLogs.subtitle", "Track all incoming and outgoing transactions for this hotel.")}
        </Typography>
      </Stack>

      <PaymentSummaryHeader
        incomingAmount={data?.totalIncoming ?? 0}
        incomingCount={data?.incomingCount ?? 0}
        outgoingAmount={data?.totalOutgoing ?? 0}
        outgoingCount={data?.outgoingCount ?? 0}
        isLoading={query.isLoading}
      />

      <FiltersCard variant="outlined">
        <Stack direction={{ xs: 'column', md: 'row' }} gap={1.5} alignItems={{ md: 'center' }}>
          <SearchInput
            value={filters.search}
            placeholder={t("hotelPaymentLogs.filters.search", "Search by name or reference…")}
            onChange={(value) => updateFilter('search', value)}
            sx={{ flex: 1, minWidth: 220 }}
          />
          <FormControl size='small'>
            <InputLabel id="payment-logs-direction-label">
              {t("hotelPaymentLogs.filters.direction", "Direction")}
            </InputLabel>
            <Select
              labelId="payment-logs-direction-label"
              label={t("hotelPaymentLogs.filters.direction", "Direction")}
              value={filters.transactionType}
              onChange={(e) => updateFilter('transactionType', e.target.value as PaymentDirection | '')}
            >
              <MenuItem value="">{t("hotelPaymentLogs.filters.all", "All")}</MenuItem>
              {(Object.keys(PAYMENT_DIRECTION_CONFIG) as PaymentDirection[]).map((direction) => (
                <MenuItem key={direction} value={direction}>
                  {t(`hotelPaymentLogs.directions.${direction}`, PAYMENT_DIRECTION_CONFIG[direction].label)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ width: { xs: '100%', md: 200 } }}>
            <InputLabel id="payment-logs-type-label">
              {t("hotelPaymentLogs.filters.type", "Payment Type")}
            </InputLabel>
            <Select
              labelId="payment-logs-type-label"
              label={t("hotelPaymentLogs.filters.type", "Payment Type")}
              value={filters.type}
              onChange={(e) => updateFilter('type', e.target.value as PaymentType | '')}
            >
              <MenuItem value="">{t("hotelPaymentLogs.filters.all", "All")}</MenuItem>
              {PAYMENT_TYPE_OPTIONS.map((type) => (
                <MenuItem key={type} value={type}>
                  {t(`hotelPaymentLogs.paymentTypes.${type}`, PAYMENT_TYPE_CONFIG[type].label)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {hasActiveFilters && (
            <Button
              size="small"
              color="inherit"
              onClick={resetFilters}
              startIcon={<Icon icon="lucide:x" fontSize={16} />}
            >
              {t("hotelPaymentLogs.filters.clear", "Clear filters")}
            </Button>
          )}
        </Stack>
      </FiltersCard>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="flex-end"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={1}
      >
        <Stack direction="row" alignItems="center" gap={1} flexShrink={0}>
          <PaymentViewToggle value={viewMode} onChange={handleViewModeChange} />
          <Typography variant="caption">
            {t("hotelPaymentLogs.sortBy", "Sort by:")}
          </Typography>
          <Select
            size="small"
            value="newest"
            variant="standard"
            disableUnderline
            sx={{ fontSize: 13, fontWeight: 600 }}
          >
            <MenuItem value="newest">{t("hotelPaymentLogs.sortOptions.newest", "Newest")}</MenuItem>
            <MenuItem value="oldest">{t("hotelPaymentLogs.sortOptions.oldest", "Oldest")}</MenuItem>
            <MenuItem value="amount_desc">{t("hotelPaymentLogs.sortOptions.amountDesc", "Highest Amount")}</MenuItem>
            <MenuItem value="amount_asc">{t("hotelPaymentLogs.sortOptions.amountAsc", "Lowest Amount")}</MenuItem>
          </Select>
        </Stack>
      </Stack>

      {viewMode === 'feed' ? (
        <PaymentFeed
          groups={data?.groups ?? []}
          selectedId={selectedPaymentId}
          isLoading={query.isLoading}
          onSelect={handleSelectPayment}
        />
      ) : (
        <ExcelModeGrid
          rows={excelRows}
          onChange={handleExcelRowsChange}
          isLoading={query.isLoading}
        />
      )}

      {data && data.totalCount > 0 && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={1}
        >
          <Pagination
            count={totalPages}
            page={pageNumber}
            onChange={(_, page) => setPageNumber(page)}
            color="primary"
            shape="rounded"
            size="small"
          />
          <Select
            size="small"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            sx={{ fontSize: 13 }}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <MenuItem key={n} value={n}>
                {t("hotelPaymentLogs.perPage", "{{count}} per page", { count: n })}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}

      {viewMode === 'feed' && (
        <PaymentDetailsDrawer
          payment={detailsQuery.data ?? null}
          isLoading={detailsQuery.isLoading}
          open={!!selectedPaymentId}
          onClose={handleCloseDrawer}
        />
      )}
    </Stack>
  )
}

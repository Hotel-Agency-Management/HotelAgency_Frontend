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
import DirectionalIcon from '@/components/common/DirectionalIcon'
import SearchInput from '@/components/common/SearchInput'
import { PaymentFeed } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentFeed'
import { PaymentDetailsDrawer } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentDetailsDrawer'
import { PaymentSummaryHeader } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentSummaryHeader'
import { PAGE_SIZE_OPTIONS, PAYMENT_TYPE_OPTIONS } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/constants/paymentLogsConstants'
import { PAYMENT_DIRECTION_CONFIG } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/constants/paymentDirectionConfig'
import { PAYMENT_TYPE_CONFIG } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/constants/paymentTypeConfig'
import { useAdminPaymentLogs } from '../hooks/useAdminPaymentLogs'
import type { HotelPaymentLogsResponse, PaymentLogsGroup } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'
import type { PaymentDirection, PaymentType } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/types/payment'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'

function resolveGroups(data: HotelPaymentLogsResponse | undefined): PaymentLogsGroup[] {
  if (!data) return []
  return data.groups
}

interface AdminHotelPaymentLogsProps {
  hotel: CustomerHotel
  onBack: () => void
}

export function AdminHotelPaymentLogs({ hotel, onBack }: AdminHotelPaymentLogsProps) {
  const { t } = useTranslation()
  const agencyId = String(hotel.agencyId!)
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
  } = useAdminPaymentLogs(agencyId, hotel.id)

  const data = query.data
  const totalPages = data?.totalPages ?? 0
  const totalCount = data?.totalCount ?? 0

  return (
    <Stack gap={3}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Button
          startIcon={<DirectionalIcon icon="lucide:arrow-left" fontSize={16} />}
          onClick={onBack}
          variant="text"
          size="small"
        >
          {t('paymentLogs.allHotels', { defaultValue: 'All Hotels' })}
        </Button>
        <Typography variant="body2" color="text.secondary">
          /
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {hotel.name}
        </Typography>
      </Stack>

      <PaymentSummaryHeader
        incomingAmount={data?.totalIncoming ?? 0}
        incomingCount={data?.incomingCount ?? 0}
        outgoingAmount={data?.totalOutgoing ?? 0}
        outgoingCount={data?.outgoingCount ?? 0}
        isLoading={query.isLoading}
      />

        <Stack direction={{ xs: 'column', md: 'row' }} gap={1.5} alignItems={{ md: 'center' }}>
          <SearchInput
            value={filters.search}
            placeholder={t('hotelPaymentLogs.filters.search', { defaultValue: 'Search by name or reference...' })}
            onChange={(value) => updateFilter('search', value)}
            sx={{ flex: 1, minWidth: 220 }}
          />
          <FormControl size="small" sx={{ width: { xs: '100%', md: 180 } }}>
            <InputLabel id="admin-payment-logs-direction-label">
              {t('hotelPaymentLogs.filters.direction', { defaultValue: 'Direction' })}
            </InputLabel>
            <Select
              labelId="admin-payment-logs-direction-label"
              label={t('hotelPaymentLogs.filters.direction', { defaultValue: 'Direction' })}
              value={filters.transactionType}
              onChange={(e) => updateFilter('transactionType', e.target.value as PaymentDirection | '')}
            >
              <MenuItem value="">{t('hotelPaymentLogs.filters.all', { defaultValue: 'All' })}</MenuItem>
              {(Object.keys(PAYMENT_DIRECTION_CONFIG) as PaymentDirection[]).map((direction) => (
                <MenuItem key={direction} value={direction}>
                  {t(`hotelPaymentLogs.directions.${direction}`, { defaultValue: PAYMENT_DIRECTION_CONFIG[direction].label })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ width: { xs: '100%', md: 200 } }}>
            <InputLabel id="admin-payment-logs-type-label">
              {t('hotelPaymentLogs.filters.type', { defaultValue: 'Payment Type' })}
            </InputLabel>
            <Select
              labelId="admin-payment-logs-type-label"
              label={t('hotelPaymentLogs.filters.type', { defaultValue: 'Payment Type' })}
              value={filters.type}
              onChange={(e) => updateFilter('type', e.target.value as PaymentType | '')}
            >
              <MenuItem value="">{t('hotelPaymentLogs.filters.all', { defaultValue: 'All' })}</MenuItem>
              {PAYMENT_TYPE_OPTIONS.map((type) => (
                <MenuItem key={type} value={type}>
                  {t(`hotelPaymentLogs.paymentTypes.${type}`, { defaultValue: PAYMENT_TYPE_CONFIG[type].label })}
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
              {t('hotelPaymentLogs.filters.clear', { defaultValue: 'Clear filters' })}
            </Button>
          )}
        </Stack>

      <PaymentFeed
        groups={resolveGroups(data)}
        selectedId={selectedPaymentId}
        isLoading={query.isLoading}
        onSelect={handleSelectPayment}
      />

      {data && totalCount > 0 && (
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
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
            sx={{ fontSize: 13 }}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <MenuItem key={n} value={n}>
                {t('paymentLogs.perPage', { count: n, defaultValue: '{{count}} per page' })}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}

      <PaymentDetailsDrawer
        payment={detailsQuery.data ?? null}
        isLoading={detailsQuery.isLoading}
        open={!!selectedPaymentId}
        onClose={handleCloseDrawer}
      />
    </Stack>
  )
}

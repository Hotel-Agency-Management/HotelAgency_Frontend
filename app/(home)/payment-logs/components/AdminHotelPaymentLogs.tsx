'use client'

import {
  Button,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import DirectionalIcon from '@/components/common/DirectionalIcon'
import { PaymentFeed } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentFeed'
import { PaymentDetailsDrawer } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentDetailsDrawer'
import { PaymentSummaryHeader } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentSummaryHeader'
import { PaymentFilterBar } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentFilterBar'
import { PAGE_SIZE_OPTIONS } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/constants/paymentLogsConstants'
import { useAdminPaymentLogs } from '../hooks/useAdminPaymentLogs'
import type { HotelPaymentLogsResponse, PaymentLogsGroup } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'
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

      <PaymentFilterBar
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        directionLabelId="admin-payment-logs-direction-label"
        typeLabelId="admin-payment-logs-type-label"
      />

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

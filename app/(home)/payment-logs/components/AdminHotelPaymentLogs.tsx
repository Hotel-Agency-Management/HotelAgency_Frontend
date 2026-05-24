'use client'

import {
  Box,
  Button,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import DirectionalIcon from '@/components/common/DirectionalIcon'
import { PaymentFeed } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentFeed'
import { PaymentDetailsDrawer } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentDetailsDrawer'
import { PaymentSummaryHeader } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentSummaryHeader'
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
    activeTab,
    handleTabChange,
    selectedPaymentId,
    handleSelectPayment,
    handleCloseDrawer,
    activePage,
    setActivePage,
    pageSize,
    setPageSize,
    incomingQuery,
    outgoingQuery,
    activeQuery,
    detailsQuery,
  } = useAdminPaymentLogs(agencyId, hotel.id)

  const isIncoming = activeTab === 0
  const activeData = activeQuery.data
  const totalPages = activeData?.totalPages ?? 0
  const totalCount = activeData?.totalCount ?? 0

  const incomingData = incomingQuery.data
  const outgoingData = outgoingQuery.data

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
        incomingAmount={incomingData?.totalIncoming ?? 0}
        incomingCount={incomingData?.incomingCount ?? 0}
        outgoingAmount={outgoingData?.totalOutgoing ?? 0}
        outgoingCount={outgoingData?.outgoingCount ?? 0}
        isLoading={incomingQuery.isLoading || outgoingQuery.isLoading}
        activeTab={activeTab}
      />

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={1}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label={
              <Stack direction="row" alignItems="center" gap={1}>
                <Icon icon="lucide:arrow-down-circle" fontSize={16} />
                <Box component="span">
                  {t('paymentLogs.tabs.incomingPayments', { defaultValue: 'Incoming Payments' })}
                  {incomingData ? ` (${incomingData.totalCount})` : ''}
                </Box>
              </Stack>
            }
          />
          <Tab
            label={
              <Stack direction="row" alignItems="center" gap={1}>
                <Icon icon="lucide:arrow-up-circle" fontSize={16} />
                <Box component="span">
                  {t('paymentLogs.tabs.outgoingExpenses', { defaultValue: 'Outgoing Expenses' })}
                  {outgoingData ? ` (${outgoingData.totalCount})` : ''}
                </Box>
              </Stack>
            }
          />
        </Tabs>
      </Stack>

      <PaymentFeed
        groups={resolveGroups(activeData)}
        selectedId={selectedPaymentId}
        isIncoming={isIncoming}
        isLoading={activeQuery.isLoading}
        onSelect={handleSelectPayment}
      />

      {activeData && totalCount > 0 && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={1}
        >
          <Pagination
            count={totalPages}
            page={activePage}
            onChange={(_, page) => setActivePage(page)}
            color="primary"
            shape="rounded"
            size="small"
          />
          <Select
            size="small"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setActivePage(1)
            }}
            sx={{ fontSize: 13 }}
          >
            {[7, 10, 20, 50].map((n) => (
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
        isIncoming={isIncoming}
        open={!!selectedPaymentId}
        onClose={handleCloseDrawer}
      />
    </Stack>
  )
}

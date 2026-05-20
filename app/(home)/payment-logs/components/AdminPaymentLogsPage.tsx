'use client'

import {
  Autocomplete,
  Box,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'
import Icon from '@/components/icon/Icon'
import { PaymentFeed } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentFeed'
import { PaymentDetailsDrawer } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentDetailsDrawer'
import { PaymentSummaryHeader } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentSummaryHeader'
import { useAdminPaymentLogs } from '../hooks/useAdminPaymentLogs'
import type { AdminHotel } from '../api/adminPaymentLogsApi'

export function AdminPaymentLogsPage() {
  const {
    activeTab,
    handleTabChange,
    selectedPayment,
    handleSelectPayment,
    handleCloseDrawer,
    activePage,
    setActivePage,
    pageSize,
    setPageSize,
    incomingQuery,
    outgoingQuery,
    activeQuery,
    hotelsQuery,
    selectedHotel,
    handleHotelChange,
  } = useAdminPaymentLogs()

  const isIncoming = activeTab === 0
  const activeData = activeQuery.data
  const totalPages = activeData ? Math.ceil(activeData.totalCount / pageSize) : 0

  return (
    <Stack gap={3}>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={2}
      >
        <Stack gap={0.5}>
          <Typography variant="h5" fontWeight={700}>
            Payment Logs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track incoming and outgoing transactions across all hotels.
          </Typography>
        </Stack>

        <Autocomplete<AdminHotel>
          options={hotelsQuery.data ?? []}
          value={selectedHotel}
          onChange={(_, value) => handleHotelChange(value)}
          loading={hotelsQuery.isLoading}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              <Stack>
                <Typography variant="body2" fontWeight={600}>
                  {option.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.city}
                </Typography>
              </Stack>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter by hotel"
              size="small"
              placeholder="All hotels"
            />
          )}
          sx={{ minWidth: 280 }}
          clearOnEscape
        />
      </Stack>

      <PaymentSummaryHeader
        incomingAmount={incomingQuery.data?.totalAmount ?? 0}
        incomingCount={incomingQuery.data?.totalCount ?? 0}
        outgoingAmount={outgoingQuery.data?.totalAmount ?? 0}
        outgoingCount={outgoingQuery.data?.totalCount ?? 0}
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
                  Incoming Payments
                  {incomingQuery.data ? ` (${incomingQuery.data.totalCount})` : ''}
                </Box>
              </Stack>
            }
          />
          <Tab
            label={
              <Stack direction="row" alignItems="center" gap={1}>
                <Icon icon="lucide:arrow-up-circle" fontSize={16} />
                <Box component="span">
                  Outgoing Expenses
                  {outgoingQuery.data ? ` (${outgoingQuery.data.totalCount})` : ''}
                </Box>
              </Stack>
            }
          />
        </Tabs>

        <Stack direction="row" alignItems="center" gap={1} flexShrink={0}>
          <Typography variant="caption" color="text.secondary">
            Sort by:
          </Typography>
          <Select
            size="small"
            value="newest"
            variant="standard"
            disableUnderline
            sx={{ fontSize: 13, fontWeight: 600 }}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="amount_desc">Highest Amount</MenuItem>
            <MenuItem value="amount_asc">Lowest Amount</MenuItem>
          </Select>
        </Stack>
      </Stack>

      <PaymentFeed
        payments={activeData?.items ?? []}
        selectedId={selectedPayment?.id ?? null}
        isIncoming={isIncoming}
        isLoading={activeQuery.isLoading}
        onSelect={handleSelectPayment}
      />

      {activeData && activeData.totalCount > 0 && (
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
                {n} per page
              </MenuItem>
            ))}
          </Select>
        </Stack>
      )}

      <PaymentDetailsDrawer
        payment={selectedPayment}
        isIncoming={isIncoming}
        onClose={handleCloseDrawer}
      />

    </Stack>
  )
}

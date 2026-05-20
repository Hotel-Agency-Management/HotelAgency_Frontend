'use client'

import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Icon from '@/components/icon/Icon'
import { PaymentFeed } from './PaymentFeed'
import { PaymentDetailsDrawer } from './PaymentDetailsDrawer'
import { PaymentSummaryHeader } from './PaymentSummaryHeader'
import { usePaymentLogs } from '../hooks/usePaymentLogs'

interface PaymentLogsPageProps {
  hotelId: string
}

export function PaymentLogsPage({ hotelId }: PaymentLogsPageProps) {
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
  } = usePaymentLogs(hotelId)

  const isIncoming = activeTab === 0
  const activeData = activeQuery.data
  const totalPages = activeData ? Math.ceil(activeData.totalCount / pageSize) : 0

  return (
    <Stack gap={3}>
      <Stack gap={0.5}>
        <Typography variant="h5" fontWeight={700}>
          Payment Logs
        </Typography>
        <Typography variant="body2">
          Track all incoming and outgoing transactions for this hotel.
        </Typography>
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
          <Typography variant="caption">
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
            {Array.from([7, 10, 20, 50]).map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize}>
                {pageSize} per page
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

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
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { PaymentFeed } from './PaymentFeed'
import { PaymentDetailsDrawer } from './PaymentDetailsDrawer'
import { PaymentSummaryHeader } from './PaymentSummaryHeader'
import { PaymentViewToggle } from './PaymentViewToggle'
import { ExcelModeGrid } from './ExcelModeGrid'
import { usePaymentLogs } from '../hooks/usePaymentLogs'

interface PaymentLogsPageProps {
  hotelId: string
}

export function PaymentLogsPage({ hotelId }: PaymentLogsPageProps) {
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
    viewMode,
    handleViewModeChange,
    excelRows,
    handleExcelRowsChange,
  } = usePaymentLogs(hotelId)

  const { t } = useTranslation()
  const isIncoming = activeTab === 0
  const activeData = activeQuery.data
  const totalPages = activeData?.totalPages ?? 0

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
        incomingAmount={incomingQuery.data?.totalIncoming ?? 0}
        incomingCount={incomingQuery.data?.incomingCount ?? 0}
        outgoingAmount={outgoingQuery.data?.totalOutgoing ?? 0}
        outgoingCount={outgoingQuery.data?.outgoingCount ?? 0}
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
                  {t("hotelPaymentLogs.tabs.incoming", "Incoming Payments")}
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
                  {t("hotelPaymentLogs.tabs.outgoing", "Outgoing Expenses")}
                  {outgoingQuery.data ? ` (${outgoingQuery.data.totalCount})` : ''}
                </Box>
              </Stack>
            }
          />
        </Tabs>

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
          groups={activeData?.groups ?? []}
          selectedId={selectedPaymentId}
          isIncoming={isIncoming}
          isLoading={activeQuery.isLoading}
          onSelect={handleSelectPayment}
        />
      ) : (
        <ExcelModeGrid
          rows={excelRows}
          onChange={handleExcelRowsChange}
          isLoading={activeQuery.isLoading}
        />
      )}

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
            {Array.from([7, 10, 20, 50]).map((n) => (
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
          isIncoming={isIncoming}
          open={!!selectedPaymentId}
          onClose={handleCloseDrawer}
        />
      )}
    </Stack>
  )
}

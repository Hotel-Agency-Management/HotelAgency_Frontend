'use client'

import { useState } from 'react'
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
import { PaymentFeed } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentFeed'
import { AdminHotelPaymentLogs } from './AdminHotelPaymentLogs'
import { HotelGrid } from './HotelGrid'
import { useAdminAllPaymentsQuery } from '../hooks/queries/useAdminAllPaymentsQuery'
import { useAdminHotelsQuery } from '../hooks/queries/useAdminHotelsQuery'
import type { PaymentLogsGroup } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/config/paymentLogsConfig'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'

function resolveGroups(items: PaymentLogsGroup['items'] | undefined): PaymentLogsGroup[] {
  if (!items || items.length === 0) return []
  return [{ weekStart: '', weekEnd: '', items }]
}

export function AdminPaymentLogsPage() {
  const [topTab, setTopTab] = useState<0 | 1>(0)
  const [selectedHotel, setSelectedHotel] = useState<CustomerHotel | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const allPaymentsQuery = useAdminAllPaymentsQuery({ pageNumber, pageSize })
  const hotelsQuery = useAdminHotelsQuery()

  function handleTopTabChange(_: React.SyntheticEvent, value: 0 | 1) {
    setTopTab(value)
    setSelectedHotel(null)
  }

  function handleHotelSelect(hotel: CustomerHotel) {
    if (!hotel.agencyId) return
    setSelectedHotel(hotel)
  }

  return (
    <Stack gap={3}>
      <Stack gap={0.5}>
        <Typography variant="h5" fontWeight={700}>
          Payment Logs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track incoming and outgoing transactions across all hotels.
        </Typography>
      </Stack>

      <Tabs
        value={topTab}
        onChange={handleTopTabChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab
          label={
            <Stack direction="row" alignItems="center" gap={1}>
              <Icon icon="lucide:list" fontSize={16} />
              <Box component="span">All Payments</Box>
            </Stack>
          }
        />
        <Tab
          label={
            <Stack direction="row" alignItems="center" gap={1}>
              <Icon icon="lucide:building-2" fontSize={16} />
              <Box component="span">Hotels</Box>
            </Stack>
          }
        />
      </Tabs>

      {topTab === 0 && (
        <Stack gap={3}>
          <PaymentFeed
            groups={resolveGroups(allPaymentsQuery.data?.items)}
            selectedId={null}
            isIncoming={true}
            isLoading={allPaymentsQuery.isLoading}
            onSelect={() => {}}
          />

          {allPaymentsQuery.data && allPaymentsQuery.data.totalCount > 0 && (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              gap={1}
            >
              <Pagination
                count={allPaymentsQuery.data.totalPages}
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
                  setPageNumber(1)
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
        </Stack>
      )}

      {topTab === 1 && (
        <>
          {selectedHotel ? (
            <AdminHotelPaymentLogs
              hotel={selectedHotel}
              onBack={() => setSelectedHotel(null)}
            />
          ) : (
            <HotelGrid
              hotels={hotelsQuery.data ?? []}
              isLoading={hotelsQuery.isLoading}
              onSelect={handleHotelSelect}
            />
          )}
        </>
      )}
    </Stack>
  )
}

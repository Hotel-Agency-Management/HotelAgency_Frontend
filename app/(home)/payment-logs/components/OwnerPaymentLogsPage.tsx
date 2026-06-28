'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import DirectionalIcon from '@/components/common/DirectionalIcon'
import { PaymentLogsPage } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentLogsPage'
import { useGetHotels } from '@/app/(home)/agency/hotels/hooks/queries/useHotelQueries'
import { HotelGrid } from './HotelGrid'
import { HotelSearchBar } from './HotelSearchBar'
import { HotelPaginationFooter } from './HotelPaginationFooter'
import type { HotelCardItem } from './HotelGrid'
import type { Hotel } from '@/app/(home)/agency/hotels/types/hotel'

export function OwnerPaymentLogsPage() {
  const { t } = useTranslation()
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(9)

  const [debouncedSearch] = useDebounce(search, 300)
  const [debouncedLocation] = useDebounce(location, 300)

  const hotelsQuery = useGetHotels({
    search: debouncedSearch || undefined,
    location: debouncedLocation || undefined,
    pageNumber,
    pageSize,
  })

  const hotelsData = hotelsQuery.data
  const hasActiveFilters = search !== '' || location !== ''

  const hotelItems: HotelCardItem[] = (hotelsData?.items ?? []).map((hotel) => ({
    id: hotel.id,
    name: hotel.basicInfo.name,
    city: hotel.basicInfo.city,
    country: hotel.basicInfo.country,
  }))

  function handleHotelSelect(id: string) {
    const hotel = hotelsData?.items.find((h) => h.id === id)
    if (hotel) setSelectedHotel(hotel)
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setPageNumber(1)
  }

  function handleLocationChange(value: string) {
    setLocation(value)
    setPageNumber(1)
  }

  function resetFilters() {
    setSearch('')
    setLocation('')
    setPageNumber(1)
  }

  if (selectedHotel) {
    return (
      <Stack gap={3}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Button
            startIcon={<DirectionalIcon icon="lucide:arrow-left" fontSize={16} />}
            onClick={() => setSelectedHotel(null)}
            variant="text"
            size="small"
          >
            {t('paymentLogs.allHotels', { defaultValue: 'All Hotels' })}
          </Button>
          <Typography variant="body2" color="text.secondary">
            /
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {selectedHotel.basicInfo.name}
          </Typography>
        </Stack>

        <PaymentLogsPage hotelId={selectedHotel.id} />
      </Stack>
    )
  }

  return (
    <Stack gap={3}>
      <Stack gap={0.5}>
        <Typography variant="h5" fontWeight={700}>
          {t('paymentLogs.title', { defaultValue: 'Payment Logs' })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('paymentLogs.subtitle', { defaultValue: 'Track incoming and outgoing transactions across all hotels.' })}
        </Typography>
      </Stack>

      <HotelSearchBar
        search={search}
        location={location}
        onSearchChange={handleSearchChange}
        onLocationChange={handleLocationChange}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <HotelGrid
        hotels={hotelItems}
        isLoading={hotelsQuery.isLoading}
        onSelect={handleHotelSelect}
      />

      <HotelPaginationFooter
        totalCount={hotelsData?.totalCount ?? 0}
        totalPages={hotelsData?.totalPages ?? 0}
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        pageSize={pageSize}
        onPageSizeChange={(size) => { setPageSize(size); setPageNumber(1) }}
      />
    </Stack>
  )
}

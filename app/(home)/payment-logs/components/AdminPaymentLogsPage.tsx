'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { AdminHotelPaymentLogs } from './AdminHotelPaymentLogs'
import { HotelGrid } from './HotelGrid'
import { HotelSearchBar } from './HotelSearchBar'
import { HotelPaginationFooter } from './HotelPaginationFooter'
import { useAdminHotelsQuery } from '../hooks/queries/useAdminHotelsQuery'
import type { HotelCardItem } from './HotelGrid'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'

export function AdminPaymentLogsPage() {
  const { t } = useTranslation()
  const [selectedHotel, setSelectedHotel] = useState<CustomerHotel | null>(null)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(9)

  const [debouncedSearch] = useDebounce(search, 300)
  const [debouncedLocation] = useDebounce(location, 300)

  const hotelsQuery = useAdminHotelsQuery({
    search: debouncedSearch || undefined,
    location: debouncedLocation || undefined,
    pageNumber,
    pageSize,
  })

  const hotelsData = hotelsQuery.data
  const hasActiveFilters = search !== '' || location !== ''

  const hotelItems: HotelCardItem[] = (hotelsData?.items ?? []).map((hotel) => ({
    id: hotel.id,
    name: hotel.name,
    city: hotel.city,
    country: hotel.country,
    disabled: !hotel.agencyId,
    disabledMessage: t('paymentLogs.noAgencyLinked', { defaultValue: 'No agency linked' }),
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
      <AdminHotelPaymentLogs
        hotel={selectedHotel}
        onBack={() => setSelectedHotel(null)}
      />
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
        searchPlaceholder={t('paymentLogs.hotels.search', { defaultValue: 'Search hotels or agencies...' })}
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

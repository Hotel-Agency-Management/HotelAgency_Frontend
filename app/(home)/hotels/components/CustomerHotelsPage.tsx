'use client'

import { Container, Stack } from '@mui/material'
import { DEFAULT_HOTEL_FILTERS } from '../constants/hotelFilters'
import { useCustomerHotels } from '../hooks/useCustomerHotels'
import { HotelEmptyState } from './HotelEmptyState'
import { HotelGrid } from './HotelGrid'
import { HotelLoadingGrid } from './HotelLoadingGrid'
import { HotelResultsHeader } from './HotelResultsHeader'
import { HotelSearchBar } from './HotelSearchBar'
import { HotelsHero } from './HotelsHero'

export function CustomerHotelsPage() {
  const {
    hotels,
    filteredHotels,
    destinationOptions,
    filters,
    updateFilters,
    isLoading,
  } = useCustomerHotels()

  const resetFilters = () => {
    updateFilters('destination', DEFAULT_HOTEL_FILTERS.destination)
    updateFilters('query', DEFAULT_HOTEL_FILTERS.query)
    updateFilters('sort', DEFAULT_HOTEL_FILTERS.sort)
  }

  return (
    <Container maxWidth="xl">
      <Stack spacing={4}>
        <Stack spacing={3}>
          <HotelsHero />
          <HotelSearchBar
            filters={filters}
            destinations={destinationOptions}
            onChange={updateFilters}
          />
        </Stack>

        <HotelResultsHeader
          count={filteredHotels.length}
          total={hotels.length}
          sort={filters.sort}
          onSortChange={sort => updateFilters('sort', sort)}
        />

        {isLoading ? (
          <HotelLoadingGrid />
        ) : filteredHotels.length > 0 ? (
          <HotelGrid hotels={filteredHotels} />
        ) : (
          <HotelEmptyState onReset={resetFilters} />
        )}
      </Stack>
    </Container>
  )
}

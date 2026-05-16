'use client'

import { Box, Container, Pagination, Stack } from '@mui/material'
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
    isFetching,
    page,
    totalPages,
    handlePageChange,
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
          <Box sx={{ opacity: isFetching ? 0.5 : 1, transition: 'opacity 0.2s' }}>
            <HotelGrid hotels={filteredHotels} />
          </Box>
        ) : (
          <HotelEmptyState onReset={resetFilters} />
        )}

        {totalPages > 1 && (
          <Stack alignItems="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Stack>
        )}
      </Stack>
    </Container>
  )
}

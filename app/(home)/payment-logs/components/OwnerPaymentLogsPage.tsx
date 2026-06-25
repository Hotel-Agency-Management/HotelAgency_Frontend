'use client'

import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import {
  Button,
  InputAdornment,
  Pagination,
  PaginationItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import DirectionalIcon from '@/components/common/DirectionalIcon'
import SearchInput from '@/components/common/SearchInput'
import { PaymentLogsPage } from '@/app/(home)/agency/hotels/[hotelId]/payment-logs/components/PaymentLogsPage'
import { useGetHotels } from '@/app/(home)/agency/hotels/hooks/queries/useHotelQueries'
import { OwnerHotelGrid } from './OwnerHotelGrid'
import type { Hotel } from '@/app/(home)/agency/hotels/types/hotel'

export function OwnerPaymentLogsPage() {
  const { t } = useTranslation()
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(9)

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

      <Stack direction={{ xs: 'column', md: 'row' }} gap={1.5} alignItems={{ md: 'center' }}>
        <SearchInput
          value={search}
          placeholder={t('paymentLogs.hotels.search', { defaultValue: 'Search hotels...' })}
          onChange={handleSearchChange}
          sx={{ flex: 1, minWidth: 220 }}
        />
        <TextField
          size="small"
          label={t('paymentLogs.hotels.location', { defaultValue: 'Location' })}
          value={location}
          onChange={(event) => handleLocationChange(event.target.value)}
          sx={{ width: { xs: '100%', md: 220 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="lucide:map-pin" fontSize={16} />
                </InputAdornment>
              ),
            },
          }}
        />
        {hasActiveFilters && (
          <Button
            size="small"
            color="inherit"
            onClick={resetFilters}
            startIcon={<Icon icon="lucide:x" fontSize={16} />}
          >
            {t('hotelPaymentLogs.filters.clear', { defaultValue: 'Clear filters' })}
          </Button>
        )}
      </Stack>

      <OwnerHotelGrid
        hotels={hotelsData?.items ?? []}
        isLoading={hotelsQuery.isLoading}
        onSelect={setSelectedHotel}
      />

      {hotelsData && hotelsData.totalCount > 0 && (
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={1} mt={2}>
          <Typography variant="caption" color="text.secondary" flexShrink={0}>
            {t('paymentLogs.hotels.results', {
              count: hotelsData.totalCount,
              defaultValue: '{{count}} hotels',
            })}
          </Typography>
          <Stack flex={1} alignItems="center">
            <Pagination
              count={hotelsData.totalPages}
              page={pageNumber}
              onChange={(_, page) => setPageNumber(page)}
              color="primary"
              shape="rounded"
              size="small"
              renderItem={(item) => (
                <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
              )}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

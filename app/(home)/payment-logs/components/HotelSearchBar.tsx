'use client'

import { Button, InputAdornment, Stack, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import SearchInput from '@/components/common/SearchInput'
import { HOTEL_FILTER_MD_WIDTH } from '../constants/adminPaymentLogsConstants'

interface HotelSearchBarProps {
  search: string
  location: string
  onSearchChange: (value: string) => void
  onLocationChange: (value: string) => void
  onReset: () => void
  hasActiveFilters: boolean
  searchPlaceholder?: string
}

export function HotelSearchBar({
  search,
  location,
  onSearchChange,
  onLocationChange,
  onReset,
  hasActiveFilters,
  searchPlaceholder,
}: HotelSearchBarProps) {
  const { t } = useTranslation()

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} gap={1.5} alignItems={{ md: 'center' }}>
      <SearchInput
        value={search}
        placeholder={searchPlaceholder ?? t('paymentLogs.hotels.search', { defaultValue: 'Search hotels...' })}
        onChange={onSearchChange}
        sx={{ flex: 1, minWidth: HOTEL_FILTER_MD_WIDTH }}
      />
      <TextField
        size="small"
        label={t('paymentLogs.hotels.location', { defaultValue: 'Location' })}
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        sx={{ width: { xs: '100%', md: HOTEL_FILTER_MD_WIDTH } }}
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
          onClick={onReset}
          startIcon={<Icon icon="lucide:x" fontSize={16} />}
        >
          {t('hotelPaymentLogs.filters.clear', { defaultValue: 'Clear filters' })}
        </Button>
      )}
    </Stack>
  )
}

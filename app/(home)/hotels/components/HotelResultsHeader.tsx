'use client'

import { FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { HOTEL_SORT_OPTIONS } from '../constants/hotelFilters'
import type { CustomerHotelFilters } from '../types/customerHotel'
import { HotelSortInputLabel } from './HotelResultsHeader.styles'

interface HotelResultsHeaderProps {
  count: number
  total: number
  sort: CustomerHotelFilters['sort']
  onSortChange: (sort: CustomerHotelFilters['sort']) => void
}

export function HotelResultsHeader({ count, total, sort, onSortChange }: HotelResultsHeaderProps) {
  const { t } = useTranslation()

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
    >
      <Stack spacing={1}>
        <Typography variant="h4">
          {t('hotelPortal.hotelsFound', { count, defaultValue: '{{count}} hotels found' })}
        </Typography>
        <Typography variant="body2">
          {t('hotelPortal.hotelsFoundSubtitle', { total, defaultValue: 'Showing hotels from all agencies across the platform. Total system hotels: {{total}}.' })}
        </Typography>
      </Stack>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <HotelSortInputLabel id="hotel-sort-label">
          {t('hotelPortal.filters.sortBy', 'Sort by')}
        </HotelSortInputLabel>
        <Select
          labelId="hotel-sort-label"
          value={sort}
          label={t('hotelPortal.filters.sortBy', 'Sort by')}
          onChange={event => onSortChange(event.target.value as CustomerHotelFilters['sort'])}
        >
          {HOTEL_SORT_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.value === 'recommended'
                ? t('hotelPortal.filters.sortRecommended', 'Recommended')
                : option.value === 'rating-desc'
                  ? t('hotelPortal.filters.sortTopRated', 'Top rated')
                  : option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

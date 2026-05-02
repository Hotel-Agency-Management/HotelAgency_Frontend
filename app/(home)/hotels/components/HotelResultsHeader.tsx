'use client'

import { MenuItem, Select, Stack, Typography } from '@mui/material'
import { HOTEL_SORT_OPTIONS } from '../constants/hotelFilters'
import type { CustomerHotelFilters } from '../types/customerHotel'
import { HotelSortInputLabel, SortFormControl } from '../styles/StyleComponents'

interface HotelResultsHeaderProps {
  count: number
  total: number
  sort: CustomerHotelFilters['sort']
  onSortChange: (sort: CustomerHotelFilters['sort']) => void
}

export function HotelResultsHeader({ count, total, sort, onSortChange }: HotelResultsHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
    >
      <Stack spacing={1}>
        <Typography variant="h4">
          {count} hotels found
        </Typography>
        <Typography variant="body2">
          Showing hotels from all agencies across the platform. Total system hotels: {total}.
        </Typography>
      </Stack>
      <SortFormControl size="small">
        <HotelSortInputLabel id="hotel-sort-label">
          Sort by
        </HotelSortInputLabel>
        <Select
          labelId="hotel-sort-label"
          value={sort}
          label="Sort by"
          onChange={event => onSortChange(event.target.value as CustomerHotelFilters['sort'])}
        >
          {HOTEL_SORT_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </SortFormControl>
    </Stack>
  )
}

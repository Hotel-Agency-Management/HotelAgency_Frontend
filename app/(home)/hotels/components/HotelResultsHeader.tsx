'use client'

import { FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
import { HOTEL_SORT_OPTIONS } from '../constants/hotelFilters'
import type { CustomerHotelFilters } from '../types/customerHotel'

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
      <FormControl size="small">
        <Select
          value={sort}
          onChange={event => onSortChange(event.target.value as CustomerHotelFilters['sort'])}
          displayEmpty
        >
          {HOTEL_SORT_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              Sort by: {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

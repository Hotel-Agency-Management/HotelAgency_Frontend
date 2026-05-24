'use client'

import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { CustomerHotelFilters } from '../types/customerHotel'

interface HotelSearchBarProps {
  filters: CustomerHotelFilters
  destinations: string[]
  onChange: <TKey extends keyof CustomerHotelFilters>(
    key: TKey,
    value: CustomerHotelFilters[TKey]
  ) => void
}

export function HotelSearchBar({ filters, destinations, onChange }: HotelSearchBarProps) {
  const { t } = useTranslation()

  return (
    <Paper
      elevation={0}
      variant="customerHotelSearch"
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
        <TextField
          fullWidth
          label={t('hotelPortal.search', 'Find specific hotel')}
          value={filters.query}
          onChange={event => onChange('query', event.target.value)}
          placeholder={t('hotelPortal.searchPlaceholder', 'Hotel, agency, amenity')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="hotel-destination-label">{t('hotelPortal.filters.location', 'Location')}</InputLabel>
          <Select
            labelId="hotel-destination-label"
            label={t('hotelPortal.filters.location', 'Location')}
            value={filters.destination}
            onChange={event => onChange('destination', event.target.value)}
          >
            <MenuItem value="all">{t('hotelPortal.filters.allDestinations', 'All destinations')}</MenuItem>
            {destinations.map(destination => (
              <MenuItem key={destination} value={destination}>
                {destination}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  )
}

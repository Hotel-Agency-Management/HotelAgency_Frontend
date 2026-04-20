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
  return (
    <Paper
      elevation={0}
      variant="customerHotelSearch"
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
        <TextField
          fullWidth
          label="Find specific hotel"
          value={filters.query}
          onChange={event => onChange('query', event.target.value)}
          placeholder="Hotel, agency, amenity"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="hotel-destination-label">Location</InputLabel>
          <Select
            labelId="hotel-destination-label"
            label="Location"
            value={filters.destination}
            onChange={event => onChange('destination', event.target.value)}
          >
            <MenuItem value="all">All destinations</MenuItem>
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

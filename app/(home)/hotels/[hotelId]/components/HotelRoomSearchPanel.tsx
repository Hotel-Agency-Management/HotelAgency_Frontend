'use client'

import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import { DatePickerField } from '@/components/common/DatePickerField'
import dayjs from 'dayjs'
import { Search, Users } from 'lucide-react'
import type { RoomType } from '@/app/(home)/room-types/types/roomType'
import type { CustomerRoomSearchFilters } from '../types/customerHotelDetails'
import { parsePositiveNumber } from '../utils/number'

interface HotelRoomSearchPanelProps {
  filters: CustomerRoomSearchFilters
  roomTypes: RoomType[]
  onChange: <TKey extends keyof CustomerRoomSearchFilters>(
    key: TKey,
    value: CustomerRoomSearchFilters[TKey]
  ) => void
}

export function HotelRoomSearchPanel({ filters, roomTypes, onChange }: HotelRoomSearchPanelProps) {
  return (
    <Paper elevation={0} variant="customerHotelRoomSearch">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <DatePickerField
            label="Check-in"
            value={filters.checkIn}
            onChange={value => onChange('checkIn', value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DatePickerField
            label="Check-out"
            value={filters.checkOut}
            minDate={filters.checkIn ? dayjs(filters.checkIn).add(1, 'day').format('YYYY-MM-DD') : undefined}
            onChange={value => onChange('checkOut', value)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            fullWidth
            label="Guests"
            type="number"
            value={filters.guests}
            onChange={event => onChange('guests', parsePositiveNumber(event.target.value, 1))}
            slotProps={{
              input: {
                inputProps: { min: 1 },
                startAdornment: (
                  <InputAdornment position="start">
                    <Users size={18} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            fullWidth
            label="Rooms"
            type="number"
            value={filters.rooms}
            onChange={event => onChange('rooms', parsePositiveNumber(event.target.value, 1))}
            slotProps={{
              input: {
                inputProps: { min: 1 },
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <TextField
            fullWidth
            label="Max price"
            type="number"
            value={filters.maxPrice}
            onChange={event => onChange('maxPrice', event.target.value)}
            slotProps={{
              input: {
                inputProps: { min: 0 },
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Search rooms"
            value={filters.query}
            onChange={event => onChange('query', event.target.value)}
            placeholder="Room type, amenity, view"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FormControl fullWidth>
            <InputLabel id="customer-room-type-label">Room type</InputLabel>
            <Select
              labelId="customer-room-type-label"
              label="Room type"
              value={filters.roomTypeId}
              onChange={event => onChange('roomTypeId', event.target.value)}
            >
              <MenuItem value="all">All room types</MenuItem>
              {roomTypes.map(roomType => (
                <MenuItem key={roomType.id} value={roomType.id}>
                  {roomType.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  )
}

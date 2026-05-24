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
import { useTranslation } from 'react-i18next'
import type { CustomerRoomSearchFilters } from '../types/customerHotelDetails'
import { parsePositiveNumber } from '../utils/number'

interface RoomTypeOption {
  id: string
  name: string
}

interface HotelRoomSearchPanelProps {
  filters: CustomerRoomSearchFilters
  roomTypes: RoomTypeOption[]
  onChange: <TKey extends keyof CustomerRoomSearchFilters>(
    key: TKey,
    value: CustomerRoomSearchFilters[TKey]
  ) => void
}

export function HotelRoomSearchPanel({ filters, roomTypes, onChange }: HotelRoomSearchPanelProps) {
  const { t } = useTranslation()

  return (
    <Paper elevation={0} variant="customerHotelRoomSearch">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <DatePickerField
            label={t('hotelPortal.booking.checkIn', 'Check-in')}
            value={filters.checkIn}
            onChange={value => onChange('checkIn', value)}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <DatePickerField
            label={t('hotelPortal.booking.checkOut', 'Check-out')}
            value={filters.checkOut}
            minDate={filters.checkIn ? dayjs(filters.checkIn).add(1, 'day').format('YYYY-MM-DD') : undefined}
            onChange={value => onChange('checkOut', value)}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            fullWidth
            label={t('hotelPortal.booking.guests', 'Guests')}
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
            label={t('hotelPortal.booking.rooms', 'Rooms')}
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
            label={t('hotelPortal.filters.maxPrice', 'Max price')}
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
            label={t('hotelPortal.details.searchRooms', 'Search rooms')}
            value={filters.query}
            onChange={event => onChange('query', event.target.value)}
            placeholder={t('hotelPortal.details.searchRoomsPlaceholder', 'Room type, amenity, view')}
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
            <InputLabel id="customer-room-type-label">{t('hotelPortal.filters.roomType', 'Room type')}</InputLabel>
            <Select
              labelId="customer-room-type-label"
              label={t('hotelPortal.filters.roomType', 'Room type')}
              value={filters.roomTypeId}
              onChange={event => onChange('roomTypeId', event.target.value)}
            >
              <MenuItem value="all">{t('hotelPortal.filters.allRoomTypes', 'All room types')}</MenuItem>
              {roomTypes.map(roomType => (
                <MenuItem key={roomType.id} value={roomType.name}>
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

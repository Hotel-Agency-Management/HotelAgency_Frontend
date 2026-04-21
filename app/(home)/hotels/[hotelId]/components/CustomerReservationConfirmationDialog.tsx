'use client'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import {
  formatBookingDate,
  formatCurrency,
  getStayLength,
  getTotalReservationPrice,
} from '../utils/roomBooking'

export interface ReservationDetails {
  hotelName: string
  roomNumber: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  currency: string
}

interface CustomerReservationConfirmationDialogProps {
  open: boolean
  room: Pick<RoomProfile, 'type' | 'capacity' | 'pricePerNight'>
  reservation: ReservationDetails
  onClose: () => void
  onConfirm: () => void
}

export function CustomerReservationConfirmationDialog({
  open,
  room,
  reservation,
  onClose,
  onConfirm,
}: CustomerReservationConfirmationDialogProps) {
  const { i18n } = useTranslation()
  const roomType = ROOM_TYPES[room.type]
  const stayLength = getStayLength(reservation.checkIn, reservation.checkOut)
  const totalPrice = getTotalReservationPrice(room.pricePerNight, stayLength, reservation.rooms)

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirm your reservation</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Review your reservation details before confirming.
          </Typography>

          <Stack spacing={1.25}>
            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Hotel
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {reservation.hotelName}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Room
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {reservation.roomNumber}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Room type
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {roomType.label}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Check-in
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatBookingDate(reservation.checkIn, i18n.language)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Check-out
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatBookingDate(reservation.checkOut, i18n.language)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Length of stay
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {stayLength > 0 ? `${stayLength} night${stayLength > 1 ? 's' : ''}` : '—'}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Guests
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {reservation.guests}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Rooms
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {reservation.rooms}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Capacity
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {room.capacity} guests
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="body2" color="text.secondary">
                Price per night
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatCurrency(room.pricePerNight, i18n.language, reservation.currency)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Estimated total
              </Typography>
              <Typography variant="subtitle2" fontWeight={700}>
                {formatCurrency(totalPrice, i18n.language, reservation.currency)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button color="inherit" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm reservation
        </Button>
      </DialogActions>
    </Dialog>
  )
}

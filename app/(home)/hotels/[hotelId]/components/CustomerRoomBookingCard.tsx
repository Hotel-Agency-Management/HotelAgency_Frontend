'use client'

import { useMemo, useState } from 'react'
import { Alert, Button, Paper, Rating, Snackbar, Stack, Typography } from '@mui/material'
import { CalendarDays } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import { ROOM_STATUS } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import {
  CustomerReservationConfirmationDialog,
  type ReservationDetails,
} from './CustomerReservationConfirmationDialog'
import {
  formatBookingDate,
  formatCurrency,
  getRoomDetails,
  getStayLength,
  getTotalReservationPrice,
} from '../utils/roomBooking'

interface CustomerRoomBookingCardProps {
  room: Pick<RoomProfile, 'type' | 'status' | 'floorNumber' | 'capacity' | 'pricePerNight' | 'starRating'>
  reservation: ReservationDetails
}

export function CustomerRoomBookingCard({ room, reservation }: CustomerRoomBookingCardProps) {
  const { t, i18n } = useTranslation()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const roomType = ROOM_TYPES[room.type]
  const details = getRoomDetails(room, t, i18n.language, reservation.currency)
  const stayLength = useMemo(
    () => getStayLength(reservation.checkIn, reservation.checkOut),
    [reservation.checkIn, reservation.checkOut]
  )
  const totalPrice = useMemo(
    () => getTotalReservationPrice(room.pricePerNight, stayLength, reservation.rooms),
    [reservation.rooms, room.pricePerNight, stayLength]
  )
  const isAvailable = room.status === ROOM_STATUS.AVAILABLE
  const isReservationReady =
    reservation.checkIn.length > 0 &&
    reservation.checkOut.length > 0 &&
    reservation.guests > 0 &&
    reservation.rooms > 0 &&
    stayLength > 0

  const handleConfirmReservation = () => {
    if (!isAvailable || !isReservationReady) {
      return
    }

    setConfirmOpen(false)
    setSuccessOpen(true)
  }

  return (
    <>
      <Paper variant="card" sx={{ height: '100%', width: 1 }}>
        <Stack gap={1.75}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Icon icon={roomType.icon} fontSize="small" />
              <Typography variant="subtitle2" color="text.secondary">
                {t('hotelRooms.profile.type')}
              </Typography>
            </Stack>

            <Typography variant="body1" fontWeight={700}>
              {roomType.label}
            </Typography>
          </Stack>

          {details.map(item => (
            <Stack key={item.label} direction="row" justifyContent="space-between" gap={1}>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>

              <Typography variant="body2" fontWeight={600}>
                {item.value}
              </Typography>
            </Stack>
          ))}
          <Stack gap={0.5}>
            <Typography variant="body2" color="text.secondary">
              {t('hotelRooms.profile.stars')}
            </Typography>
            <Rating value={room.starRating} readOnly size="small" />
          </Stack>

          <Stack
            gap={0.75}
          >
            <Typography variant="subtitle2">Reservation summary</Typography>
            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Check-in
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatBookingDate(reservation.checkIn, i18n.language)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Check-out
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatBookingDate(reservation.checkOut, i18n.language)}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Guests
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {reservation.guests}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Estimated total
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {formatCurrency(totalPrice, i18n.language, reservation.currency)}
              </Typography>
            </Stack>
          </Stack>

          {isAvailable ? (
            <>
              {!isReservationReady ? (
                <Alert severity="info" variant="outlined">
                  Select check-in, check-out, guests, and rooms to continue with your reservation.
                </Alert>
              ) : null}

              <Button
                fullWidth
                variant="contained"
                startIcon={<CalendarDays size={17} />}
                disabled={!isReservationReady}
                onClick={() => setConfirmOpen(true)}
              >
                Reserve this room
              </Button>
            </>
          ) : null}
        </Stack>
      </Paper>

      {isAvailable && isReservationReady ? (
        <CustomerReservationConfirmationDialog
          open={confirmOpen}
          room={room}
          reservation={reservation}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmReservation}
        />
      ) : null}

      <Snackbar
        open={successOpen}
        autoHideDuration={4500}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" variant="filled">
          Your reservation has been confirmed. Please check your email.
        </Alert>
      </Snackbar>
    </>
  )
}

'use client'

import { Alert, Button, Paper, Rating, Snackbar, Stack, Typography } from '@mui/material'
import { CalendarDays } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { DatePickerField } from '@/components/common/DatePickerField'
import Icon from '@/components/icon/Icon'
import type { ReservationDetails } from '../types/customerReservationConfirmation'
import { useCustomerRoomBookingCard } from '../hooks/useCustomerRoomBookingCard'
import { CustomerReservationConfirmationModal } from './CustomerReservationConfirmationModal'
import { ReservationCreatedDialog } from './ReservationCreatedDialog'
import { formatBookingDate, formatCurrency } from '../utils/roomBooking'

interface CustomerRoomBookingCardProps {
  hotelId: string
  roomId: string
  hotel: CustomerHotel | null
  room: Pick<
    RoomProfile,
    'type' | 'status' | 'floorNumber' | 'capacity' | 'pricePerNight' | 'extendPrice' | 'starRating'
  >
  reservation: ReservationDetails
  onReservationDateChange: (key: 'checkIn' | 'checkOut', value: string) => void
}

export function CustomerRoomBookingCard({
  hotelId,
  roomId,
  hotel,
  room,
  reservation,
  onReservationDateChange,
}: CustomerRoomBookingCardProps) {
  const { t } = useTranslation()
  const {
    language,
    roomType,
    details,
    currentReservation,
    isBusy,
    isBookable,
    draftAvailabilityConflict,
    feedback,
    confirmOpen,
    createdDocuments,
    openingContract,
    openingInvoice,
    reservationSummary,
    checkInMinDate,
    checkOutMinDate,
    canOpenConfirmationModal,
    isReserveDisabled,
    openConfirm,
    closeConfirm,
    closeCreatedDocuments,
    closeFeedback,
    handleConfirmReservation,
    handleOpenContract,
    handleOpenInvoice,
  } = useCustomerRoomBookingCard({
    hotelId,
    roomId,
    hotel,
    room,
    reservation,
  })

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

          <Stack gap={1.25}>
            <Typography variant="subtitle2">Stay dates</Typography>

            <DatePickerField
              label="Check-in"
              value={reservation.checkIn}
              minDate={checkInMinDate}
              disabled={currentReservation != null}
              onChange={value => onReservationDateChange('checkIn', value)}
            />

            <DatePickerField
              label="Check-out"
              value={reservation.checkOut}
              disabled={currentReservation != null}
              minDate={checkOutMinDate}
              onChange={value => onReservationDateChange('checkOut', value)}
            />
          </Stack>

          <Stack gap={0.75}>
            <Typography variant="subtitle2">Reservation summary</Typography>

            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Check-in
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatBookingDate(reservationSummary.checkIn, language)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Check-out
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {formatBookingDate(reservationSummary.checkOut, language)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Guests
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {reservationSummary.guests}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Estimated total
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {formatCurrency(reservationSummary.estimatedTotal, language, reservation.currency)}
              </Typography>
            </Stack>
          </Stack>

          {!isBookable ? (
            <Alert severity="warning">
              This room cannot be booked right now because it is under maintenance or blocked.
            </Alert>
          ) : null}

          {room.pricePerNight == null ? (
            <Alert severity="info">This room needs a nightly rate before it can be reserved.</Alert>
          ) : null}

          {draftAvailabilityConflict != null ? (
            <Alert severity="error">
              This room is already booked between {draftAvailabilityConflict.checkIn} and{' '}
              {draftAvailabilityConflict.checkOut}.
            </Alert>
          ) : null}

          {currentReservation ? (
            <Alert severity="success">
              You already have an active reservation for this room. Use the reservation section below
              to edit, extend, or cancel it.
            </Alert>
          ) : (
            <Button
              fullWidth
              variant="contained"
              startIcon={<CalendarDays size={17} />}
              disabled={isReserveDisabled}
              onClick={openConfirm}
            >
              Reserve this room
            </Button>
          )}
        </Stack>
      </Paper>

      {canOpenConfirmationModal ? (
        <CustomerReservationConfirmationModal
          open={confirmOpen}
          hotelId={hotelId}
          hotel={hotel}
          room={room}
          reservation={reservation}
          confirming={isBusy}
          onClose={closeConfirm}
          onConfirm={handleConfirmReservation}
        />
      ) : null}

      <ReservationCreatedDialog
        open={createdDocuments != null}
        openingContract={openingContract}
        openingInvoice={openingInvoice}
        onClose={closeCreatedDocuments}
        onOpenContract={handleOpenContract}
        onOpenInvoice={handleOpenInvoice}
      />

      <Snackbar
        open={feedback.open}
        autoHideDuration={4500}
        onClose={closeFeedback}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={closeFeedback} severity={feedback.severity} variant="filled">
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  )
}

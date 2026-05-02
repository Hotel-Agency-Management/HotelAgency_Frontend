'use client'

import { Alert, Button, Divider, Rating, Snackbar, Stack, Typography } from '@mui/material'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { DatePickerField } from '@/components/common/DatePickerField'
import type { ReservationDetails } from '../types/customerReservationConfirmation'
import { useCustomerRoomBookingCard } from '../hooks/useCustomerRoomBookingCard'
import { formatCardCurrency } from '../utils/roomBooking'
import { CustomerRoomBookingCardPaper } from './CustomerRoomBookingCard.styles'
import { CustomerReservationConfirmationModal } from './CustomerReservationConfirmationModal'
import { ReservationCreatedDialog } from './ReservationCreatedDialog'

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
  const {
    language,
    roomType,
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
  const nightlyRateLabel = formatCardCurrency(room.pricePerNight, language, reservation.currency)
  const estimatedTotalLabel = formatCardCurrency(
    reservationSummary.estimatedTotal,
    language,
    reservation.currency
  )
  const nightsLabel = `${reservationSummary.stayLength} night${
    reservationSummary.stayLength === 1 ? '' : 's'
  }`
  const guestsLabel = `${reservationSummary.guests} guest${
    reservationSummary.guests === 1 ? '' : 's'
  }`

  return (
    <>
      <CustomerRoomBookingCardPaper variant="card">
        <Stack gap={1.5} justifyContent="space-between" sx={{ width: 1, flexGrow: 1 }}>
          <Stack gap={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
              <Typography variant="h5" fontWeight={800}>
                {roomType.label}
              </Typography>

              <Stack alignItems="flex-end" gap={0.25} flexShrink={0}>
                <Typography variant="h6" fontWeight={800}>
                  {nightlyRateLabel}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                  per night
                </Typography>
              </Stack>
            </Stack>

            <Rating value={room.starRating} readOnly size="medium" />

            <Divider />

            <Stack gap={1}>
              <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.25}>
                <DatePickerField
                  label="Check-in"
                  value={reservation.checkIn}
                  minDate={checkInMinDate}
                  format="DD MMM"
                  disabled={currentReservation != null}
                  onChange={value => onReservationDateChange('checkIn', value)}
                />

                <DatePickerField
                  label="Check-out"
                  value={reservation.checkOut}
                  disabled={currentReservation != null}
                  minDate={checkOutMinDate}
                  format="DD MMM"
                  onChange={value => onReservationDateChange('checkOut', value)}
                />
              </Stack>
            </Stack>

            <Divider />
          </Stack>

          <Stack gap={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" gap={2}>
              <Stack gap={0.25}>
                <Typography variant="body2" color="text.secondary" fontWeight={700}>
                  {nightsLabel} · {guestsLabel}
                </Typography>
                <Typography variant="h5" fontWeight={800}>
                  {estimatedTotalLabel}
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary" fontWeight={700}>
                estimated total
              </Typography>
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
                disabled={isReserveDisabled}
                onClick={openConfirm}
              >
                Reserve this room
              </Button>
            )}
          </Stack>
        </Stack>
      </CustomerRoomBookingCardPaper>

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

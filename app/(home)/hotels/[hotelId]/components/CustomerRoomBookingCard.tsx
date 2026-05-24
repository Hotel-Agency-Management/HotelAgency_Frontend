'use client'

import { Alert, Button, Divider, Rating, Snackbar, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { DatePickerField } from '@/components/common/DatePickerField'
import type { ReservationDetails } from '../types/customerReservationConfirmation'
import { useCustomerRoomBookingCard } from '../hooks/useCustomerRoomBookingCard'
import { formatCardCurrency } from '../utils/roomBooking'
import { CustomerRoomBookingCardPaper } from './CustomerRoomBookingCard.styles'
import { CustomerReservationConfirmationModal } from './CustomerReservationConfirmationModal'
import { GuestLoginPromptDialog } from './GuestLoginPromptDialog'

interface ReservationCreatedDocuments {
  contractUrl: string | null
  invoiceUrl: string | null
}

interface CustomerRoomBookingCardProps {
  hotelId: string
  roomId: string
  hotel: CustomerHotel | null
  room: Pick<
    RoomProfile,
    'type' | 'roomTypeName' | 'status' | 'floorNumber' | 'capacity' | 'pricePerNight' | 'extendPrice' | 'starRating' | 'yearlyInsurance' | 'insurancePerReservation'
  >
  reservation: ReservationDetails
  onReservationDateChange: (key: 'checkIn' | 'checkOut', value: string) => void
  onReservationCreated?: (documents: ReservationCreatedDocuments) => void
}

export function CustomerRoomBookingCard({
  hotelId,
  roomId,
  hotel,
  room,
  reservation,
  onReservationDateChange,
  onReservationCreated,
}: CustomerRoomBookingCardProps) {
  const { t } = useTranslation()
  const {
    language,
    roomType,
    currentReservation,
    isBusy,
    isBookable,
    draftAvailabilityConflict,
    feedback,
    guestPromptOpen,
    closeGuestPrompt,
    confirmOpen,
    reservationSummary,
    checkInMinDate,
    checkOutMinDate,
    canOpenConfirmationModal,
    isReserveDisabled,
    openConfirm,
    closeConfirm,
    closeFeedback,
    handleConfirmReservation,
  } = useCustomerRoomBookingCard({
    hotelId,
    roomId,
    hotel,
    room,
    reservation,
    onReservationCreated,
  })
  const nightlyRateLabel = formatCardCurrency(room.pricePerNight, language, reservation.currency)
  const estimatedTotalLabel = formatCardCurrency(
    reservationSummary.estimatedTotal,
    language,
    reservation.currency
  )
  const nightsLabel = t('hotelPortal.booking.nightCount', { count: reservationSummary.stayLength })
  const guestsLabel = t('hotelPortal.booking.guestCount', { count: reservationSummary.guests })

  return (
    <>
      <CustomerRoomBookingCardPaper variant="card">
        <Stack gap={1.5} justifyContent="space-between" sx={{ width: 1, flexGrow: 1 }}>
          <Stack gap={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
              <Typography variant="h5" fontWeight={800}>
                {room.roomTypeName ?? roomType.label}
              </Typography>

              <Stack alignItems="flex-end" gap={0.25} flexShrink={0}>
                <Typography variant="h6" fontWeight={800}>
                  {nightlyRateLabel}
                </Typography>
                <Typography variant="caption" fontWeight={700}>
                  {t('hotelPortal.card.perNight', 'per night')}
                </Typography>
              </Stack>
            </Stack>

            <Rating value={room.starRating} readOnly size="medium" />

            <Divider />

            <Stack gap={1}>
              <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.25}>
                <DatePickerField
                  label={t('hotelPortal.booking.checkIn', 'Check-in')}
                  value={reservation.checkIn}
                  minDate={checkInMinDate}
                  format="DD MMM"
                  onChange={value => onReservationDateChange('checkIn', value)}
                />

                <DatePickerField
                  label={t('hotelPortal.booking.checkOut', 'Check-out')}
                  value={reservation.checkOut}
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
                <Typography variant="body2" fontWeight={700}>
                  {nightsLabel} · {guestsLabel}
                </Typography>
                <Typography variant="h5" fontWeight={800}>
                  {estimatedTotalLabel}
                </Typography>
              </Stack>

              <Typography variant="body2" fontWeight={700}>
                {t('hotelPortal.booking.estimatedTotal', 'estimated total')}
              </Typography>
            </Stack>

            {!isBookable ? (
              <Alert severity="warning">
                {t('hotelPortal.booking.cannotBookMaintenance', 'This room cannot be booked right now because it is under maintenance or blocked.')}
              </Alert>
            ) : null}

            {room.pricePerNight == null ? (
              <Alert severity="info">{t('hotelPortal.booking.noNightlyRate', 'This room needs a nightly rate before it can be reserved.')}</Alert>
            ) : null}

            {draftAvailabilityConflict != null ? (
              <Alert severity="error">
                {t('hotelPortal.booking.alreadyBooked', { checkIn: draftAvailabilityConflict.checkIn, checkOut: draftAvailabilityConflict.checkOut, defaultValue: 'This room is already booked between {{checkIn}} and {{checkOut}}.' })}
              </Alert>
            ) : null}

            {currentReservation ? (
              <Alert severity="success">
                {t('hotelPortal.booking.existingReservation', 'You already have an active reservation for this room. Choose different dates to book another stay, or use the reservation section below to manage the existing booking.')}
              </Alert>
            ) : null}

            <Button
              fullWidth
              variant="contained"
              disabled={isReserveDisabled}
              onClick={openConfirm}
            >
              {t('hotelPortal.booking.reserveRoom', 'Reserve this room')}
            </Button>
          </Stack>
        </Stack>
      </CustomerRoomBookingCardPaper>

      <GuestLoginPromptDialog open={guestPromptOpen} onClose={closeGuestPrompt} />

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

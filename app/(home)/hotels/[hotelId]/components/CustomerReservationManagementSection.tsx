'use client'

import { Alert, Chip, Grid, Paper, Snackbar, Stack, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useGetRoomTypes } from '@/app/(home)/room-types/hooks/queries/roomTypeQueries'
import { ROOM_STATUS } from '@/app/(home)/agency/hotels/[hotelId]/rooms/types/room'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import { buildReservationDetailsItems } from '../constants/reservationDetails'
import { useCustomerReservationManager } from '../hooks/useCustomerReservationManager'
import { useCustomerHotelRooms } from '../hooks/useCustomerHotelRooms'
import type { ReservationEditRoomOption } from '../hooks/useReservationEdit'
import { useReservationCancel } from '../hooks/useReservationCancel'
import { useReservationEdit } from '../hooks/useReservationEdit'
import { useReservationExtend } from '../hooks/useReservationExtend'
import { useReservationFeedback } from '../hooks/useReservationFeedback'
import {
  calculateCancellationFee,
  canModifyReservation,
  getFreeCancellationDeadline,
  getReservationEditDeadline,
  isFreeCancellationEligible,
} from '../utils/customerReservationPolicy'
import { formatBookingDate, formatCurrency, getStayLength } from '../utils/roomBooking'
import { CancelReservationDialog } from './CancelReservationDialog'
import { EditReservationDialog } from './EditReservationDialog'
import { ExtendReservationDialog } from './ExtendReservationDialog'
import { ReservationActionsMenu } from './ReservationActionsMenu'
import { ReservationDetailsGrid } from './ReservationDetailsGrid'
import { ReservationPoliciesSection } from './ReservationPoliciesSection'

interface CustomerReservationManagementSectionProps {
  hotelId: string
  roomId: string
  room: Pick<RoomProfile, 'capacity' | 'pricePerNight'>
}

export function CustomerReservationManagementSection({
  hotelId,
  roomId,
  room,
}: CustomerReservationManagementSectionProps) {
  const { i18n } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    currentReservation,
    roomReservations,
    hotelReservations,
    updateReservation,
    extendReservation,
    cancelReservation,
    isBusy,
  } = useCustomerReservationManager(hotelId, roomId)
  const { feedback, showFeedback, closeFeedback } = useReservationFeedback()
  const roomsQuery = useCustomerHotelRooms(hotelId)
  const { data: roomTypes = [] } = useGetRoomTypes()
  const currentReservationCanModify =
    currentReservation != null ? canModifyReservation(currentReservation) : false
  const currentReservationFreeCancellation =
    currentReservation != null ? isFreeCancellationEligible(currentReservation) : false
  const currentReservationCancellationFee =
    currentReservation != null ? calculateCancellationFee(currentReservation) : 0
  const currentReservationStayLength =
    currentReservation != null
      ? getStayLength(currentReservation.checkIn, currentReservation.checkOut)
      : 0
  const nightlyRate = currentReservation?.nightlyRate ?? room.pricePerNight ?? 0

  const formatReservationTimestamp = (value: string) =>
    new Intl.DateTimeFormat(i18n.language, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))

  const formatCurrencyValue = (value: number, currency: string) =>
    formatCurrency(value, i18n.language, currency)

  const edit = useReservationEdit({
    currentReservation,
    fallbackRoomCapacity: room.capacity,
    availableRooms: roomsQuery.data ?? [],
    hotelReservations,
    updateReservation,
    canModify: currentReservationCanModify,
    showFeedback,
    onSaved: updatedReservation => {
      if (updatedReservation.roomId === roomId) {
        return
      }

      const nextParams = new URLSearchParams(searchParams.toString())
      nextParams.set('checkIn', updatedReservation.checkIn)
      nextParams.set('checkOut', updatedReservation.checkOut)
      nextParams.set('guests', String(updatedReservation.guests))
      nextParams.set('rooms', String(updatedReservation.rooms))

      router.replace(`/hotels/${hotelId}/rooms/${updatedReservation.roomId}?${nextParams.toString()}`)
    },
  })

  const extend = useReservationExtend({
    currentReservation,
    roomReservations,
    extendReservation,
    showFeedback,
  })

  const cancellation = useReservationCancel({
    currentReservation,
    cancelReservation,
    showFeedback,
    formatCurrencyValue,
  })

  if (currentReservation == null) {
    return null
  }

  const detailsItems = buildReservationDetailsItems({
    reservation: currentReservation,
    stayLength: currentReservationStayLength,
    formatReservationTimestamp,
    formatBookingDate: value => formatBookingDate(value, i18n.language),
    formatCurrencyValue,
  })

  const modificationDeadlineLabel = formatReservationTimestamp(
    getReservationEditDeadline(currentReservation.createdAt)
  )
  const freeCancellationDeadlineLabel = formatReservationTimestamp(
    getFreeCancellationDeadline(currentReservation.createdAt)
  )
  const cancellationFeeLabel = formatCurrencyValue(
    currentReservationCancellationFee,
    currentReservation.currency
  )
  const roomTypeNameById = new Map(roomTypes.map(roomType => [String(roomType.id), roomType.name]))
  const roomOptions: ReservationEditRoomOption[] = (roomsQuery.data ?? []).map(hotelRoom => ({
    id: hotelRoom.id,
    label: `${hotelRoom.roomNumber} • ${roomTypeNameById.get(hotelRoom.roomTypeId) ?? 'Room'}`,
    capacity: hotelRoom.capacity,
    nightlyRate: hotelRoom.pricePerNight ?? 0,
    disabled:
      hotelRoom.id !== currentReservation.roomId &&
      (hotelRoom.status === ROOM_STATUS.MAINTENANCE || hotelRoom.status === ROOM_STATUS.BLOCKED),
  }))

  return (
    <>
      <Paper variant="card">
        <Stack gap={2.5}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'flex-start' }}
            gap={1.5}
          >
            <Stack spacing={0.75}>
              <Typography variant="h6" fontWeight={800}>
                Reservation management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your booked stay from one section without squeezing the side panel.
              </Typography>
            </Stack>

            <Stack
              alignItems={{ xs: 'flex-start', md: 'flex-end' }}
              spacing={1}
              sx={{ width: { xs: 1, md: 'auto' } }}
            >
              <ReservationActionsMenu
                canModify={currentReservationCanModify}
                isBusy={isBusy}
                onEdit={edit.openEdit}
                onExtend={extend.openExtend}
                onCancel={cancellation.openCancel}
              />

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
              >
                <Chip size="small" variant="outlined" color="success" label="Status: confirmed" />
                <Chip
                  size="small"
                  variant="outlined"
                  color={currentReservationCanModify ? 'success' : 'warning'}
                  label={currentReservationCanModify ? 'Editable now' : 'Edit window closed'}
                />
                <Chip
                  size="small"
                  variant="outlined"
                  color={currentReservationFreeCancellation ? 'success' : 'warning'}
                  label={
                    currentReservationFreeCancellation
                      ? 'Free cancellation active'
                      : 'Cancellation fee applies'
                  }
                />
              </Stack>
            </Stack>
          </Stack>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <ReservationDetailsGrid items={detailsItems} />
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <ReservationPoliciesSection
                canModify={currentReservationCanModify}
                freeCancellation={currentReservationFreeCancellation}
                modificationDeadlineLabel={modificationDeadlineLabel}
                freeCancellationDeadlineLabel={freeCancellationDeadlineLabel}
                cancellationFeeLabel={cancellationFeeLabel}
              />
            </Grid>
          </Grid>
        </Stack>
      </Paper>

      <EditReservationDialog
        open={edit.editOpen}
        canModify={currentReservationCanModify}
        roomCapacity={edit.selectedRoomCapacity}
        isBusy={isBusy}
        currency={currentReservation.currency}
        language={i18n.language}
        nightlyRate={edit.selectedNightlyRate}
        roomOptions={roomOptions}
        editForm={edit.editForm}
        editFormHasValidRange={edit.editFormHasValidRange}
        editStayLength={edit.editStayLength}
        editConflict={edit.editConflict}
        onClose={edit.closeEdit}
        onSave={edit.saveEdit}
        onFieldChange={edit.updateEditField}
      />

      <ExtendReservationDialog
        open={extend.extendOpen}
        currentCheckOut={currentReservation.checkOut}
        currentCheckIn={currentReservation.checkIn}
        currentRooms={currentReservation.rooms}
        nightlyRate={nightlyRate}
        language={i18n.language}
        currency={currentReservation.currency}
        extendCheckOut={extend.extendCheckOut}
        extendHasValidRange={extend.extendHasValidRange}
        extendConflict={extend.extendConflict}
        isBusy={isBusy}
        onClose={extend.closeExtend}
        onConfirm={extend.confirmExtend}
        onCheckOutChange={extend.setExtendCheckOut}
      />

      <CancelReservationDialog
        open={cancellation.cancelOpen}
        freeCancellation={currentReservationFreeCancellation}
        freeCancellationDeadlineLabel={freeCancellationDeadlineLabel}
        cancellationFeeLabel={cancellationFeeLabel}
        isBusy={isBusy}
        onClose={cancellation.closeCancel}
        onConfirm={cancellation.confirmCancel}
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

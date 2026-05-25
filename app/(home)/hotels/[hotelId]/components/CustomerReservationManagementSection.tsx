'use client'

import { Alert, Button, Chip, Grid, Paper, Skeleton, Snackbar, Stack, Typography } from '@mui/material'
import { CheckCircle2, Clock3, Edit3, FileText, ReceiptText } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { useCustomerReservationManager } from '../hooks/useCustomerReservationManager'
import { useReservationCancel } from '../hooks/useReservationCancel'
import { useReservationDocuments } from '../hooks/useReservationDocuments'
import { useReservationEdit } from '../hooks/useReservationEdit'
import { useReservationExtend } from '../hooks/useReservationExtend'
import { useReservationFeedback } from '../hooks/useReservationFeedback'
import { useReservationManagementLabels } from '../hooks/useReservationManagementLabels'
import { useReservationManagementSummary } from '../hooks/useReservationManagementSummary'
import { useReservationRoomOptions } from '../hooks/useReservationRoomOptions'
import { CancelReservationDialog } from './CancelReservationDialog'
import { EditReservationDialog } from './EditReservationDialog'
import { ExtendReservationDialog } from './ExtendReservationDialog'
import { ReservationActionsMenu } from './ReservationActionsMenu'
import { ReservationDetailsGrid } from './ReservationDetailsGrid'
import { ReservationPoliciesSection } from './ReservationPoliciesSection'

interface CustomerReservationManagementSectionProps {
  hotelId: string
  roomId: string
  hotel: CustomerHotel | null
  room: Pick<RoomProfile, 'type' | 'roomTypeName' | 'capacity' | 'pricePerNight' | 'extendPrice' | 'roomNumber'>
}

export function CustomerReservationManagementSection({
  hotelId,
  roomId,
  hotel,
  room
}: CustomerReservationManagementSectionProps) {
  const { t, i18n } = useTranslation()
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
    isLoading
  } = useCustomerReservationManager(hotelId, roomId, room.roomNumber, hotel?.agencyId ?? undefined)

  const { feedback, showFeedback, closeFeedback } = useReservationFeedback()

  const summary = useReservationManagementSummary(currentReservation, room, hotel)

  const labels = useReservationManagementLabels({
    currentReservation,
    hotel,
    stayLength: summary.stayLength,
    cancellationFee: summary.cancellationFee,
    language: i18n.language
  })

  const { roomOptions, availableRooms } = useReservationRoomOptions(hotelId, currentReservation?.roomId)

  const documents = useReservationDocuments(currentReservation, showFeedback)

  const edit = useReservationEdit({
    currentReservation,
    fallbackRoomCapacity: room.capacity,
    availableRooms,
    hotelReservations,
    updateReservation,
    canModify: summary.canModify,
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
    }
  })

  const extend = useReservationExtend({
    currentReservation,
    roomReservations,
    extendReservation,
    showFeedback
  })

  const cancellation = useReservationCancel({
    currentReservation,
    cancelReservation,
    showFeedback,
    formatCurrencyValue: labels.formatCurrencyValue
  })

  if (isLoading && currentReservation == null) {
    return (
      <Paper variant='card'>
        <Stack gap={2}>
          <Skeleton variant='text' width={240} height={32} />
          <Skeleton variant='rounded' height={120} />
        </Stack>
      </Paper>
    )
  }

  if (currentReservation == null) {
    return null
  }

  return (
    <>
      <Paper variant='card'>
        <Stack gap={2.5}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', md: 'flex-start' }}
            gap={1.5}
          >
            <Stack spacing={0.75}>
              <Typography variant='h6' fontWeight={800}>
                {t('hotelPortal.booking.reservationManagement', { defaultValue: 'Reservation management' })}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {t('hotelPortal.booking.reservationManagementSubtitle', {
                  defaultValue: 'Manage your booked stay from one section without squeezing the side panel.'
                })}
              </Typography>
            </Stack>

            <Stack alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={1} sx={{ width: { xs: 1, md: 'auto' } }}>
              <ReservationActionsMenu
                canModify={summary.canModify}
                isBusy={isBusy}
                onEdit={edit.openEdit}
                onExtend={extend.openExtend}
                onCancel={cancellation.openCancel}
              />

              <Stack
                direction='row'
                spacing={1}
                flexWrap='wrap'
                useFlexGap
                justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
              >
                <Chip
                  size='small'
                  variant='outlined'
                  color='success'
                  icon={<CheckCircle2 size={14} />}
                  label={t('hotelPortal.booking.statusConfirmed', { defaultValue: 'Status: confirmed' })}
                />
                <Chip
                  size='small'
                  variant='outlined'
                  color={summary.canModify ? 'info' : 'warning'}
                  icon={summary.canModify ? <Edit3 size={14} /> : <Clock3 size={14} />}
                  label={
                    summary.canModify
                      ? t('hotelPortal.booking.editableNow', { defaultValue: 'Editable now' })
                      : t('hotelPortal.booking.editWindowClosed', { defaultValue: 'Edit window closed' })
                  }
                />
                <Chip
                  size='small'
                  variant='outlined'
                  color={summary.freeCancellation ? 'warning' : 'error'}
                  icon={summary.freeCancellation ? <Clock3 size={14} /> : <ReceiptText size={14} />}
                  label={
                    summary.freeCancellation
                      ? t('hotelPortal.booking.freeCancellationActive', { defaultValue: 'Free cancellation active' })
                      : t('hotelPortal.booking.cancellationFeeApplies', { defaultValue: 'Cancellation fee applies' })
                  }
                />
              </Stack>
            </Stack>
          </Stack>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <ReservationDetailsGrid items={labels.detailsItems} />
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <Stack gap={1.5}>
                <ReservationPoliciesSection
                  canModify={summary.canModify}
                  freeCancellation={summary.freeCancellation}
                  modificationDeadlineLabel={labels.modificationDeadlineLabel}
                  freeCancellationDeadlineLabel={labels.freeCancellationDeadlineLabel}
                  cancellationFeeRateLabel={labels.cancellationFeeRateLabel}
                  cancellationFeeLabel={labels.cancellationFeeLabel}
                />

                <Stack direction={{ xs: 'column', sm: 'row' }} gap={1}>
                  <Button
                    fullWidth
                    variant='outlined'
                    color='primary'
                    startIcon={<FileText size={16} />}
                    disabled={!documents.contractDocumentUrl || isBusy}
                    onClick={documents.openContract}
                  >
                    {t('hotelPortal.booking.viewContract', { defaultValue: 'View contract' })}
                  </Button>
                  <Button
                    fullWidth
                    variant='outlined'
                    color='primary'
                    startIcon={<ReceiptText size={16} />}
                    disabled={!documents.invoiceDocumentUrl || isBusy}
                    onClick={documents.openInvoice}
                  >
                    {t('hotelPortal.booking.viewInvoice', { defaultValue: 'View invoice' })}
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Paper>

      <EditReservationDialog
        open={edit.editOpen}
        canModify={summary.canModify}
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
        showDirectReservationFields
        showReservationSourceField={false}
        canEditGuestFullName={false}
        onClose={edit.closeEdit}
        onSave={edit.saveEdit}
        onFieldChange={edit.updateEditField}
      />

      <ExtendReservationDialog
        open={extend.extendOpen}
        currentCheckOut={currentReservation.checkOut}
        extendPrice={summary.extendPrice}
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
        freeCancellation={summary.freeCancellation}
        freeCancellationDeadlineLabel={labels.freeCancellationDeadlineLabel}
        reservationTotalLabel={labels.reservationTotalLabel}
        cancellationFeeRateLabel={labels.cancellationFeeRateLabel}
        cancellationFeeLabel={labels.cancellationFeeLabel}
        refundAmountLabel={labels.refundAmountLabel}
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
        <Alert onClose={closeFeedback} severity={feedback.severity} variant='filled'>
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  )
}

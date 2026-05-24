'use client'

import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DatePickerField } from '@/components/common/DatePickerField'
import { ReservationSource } from '@/app/(home)/reservations/[hotelId]/config/reservationConfig'
import { useEditReservationDialog } from '../hooks/useEditReservationDialog'
import type { ReservationEditRoomOption } from '../hooks/useReservationEdit'
import type {
  EditReservationFieldKey,
  EditReservationFormState,
} from '../types/editReservationForm'
import { formatCurrency } from '../utils/roomBooking'

interface EditReservationDialogProps {
  open: boolean
  canModify: boolean
  roomCapacity: number
  isBusy: boolean
  currency: string
  language: string
  nightlyRate: number
  roomOptions: ReservationEditRoomOption[]
  editForm: EditReservationFormState
  editFormHasValidRange: boolean
  editStayLength: number
  editConflict: {
    checkIn: string
    checkOut: string
  } | null
  isLoadingDetails?: boolean
  showDirectReservationFields?: boolean
  showReservationSourceField?: boolean
  canEditGuestFullName?: boolean
  onClose: () => void
  onSave: () => void
  onFieldChange: (key: EditReservationFieldKey, value: string | number | boolean) => void
}

export function EditReservationDialog({
  open,
  canModify,
  roomCapacity,
  isBusy,
  currency,
  language,
  nightlyRate,
  roomOptions,
  editForm,
  editFormHasValidRange,
  editStayLength,
  editConflict,
  isLoadingDetails = false,
  showDirectReservationFields = false,
  showReservationSourceField = true,
  canEditGuestFullName = true,
  onClose,
  onSave,
  onFieldChange,
}: EditReservationDialogProps) {
  const { t } = useTranslation()
  const selectedRoomLabel =
    roomOptions.find(option => option.id === editForm.roomId)?.label ?? editForm.roomId
  const {
    steps,
    activeStep,
    stayStepIndex,
    isLastStep,
    isCurrentStepValid,
    isSaveDisabled,
    minCheckInDate,
    minCheckOutDate,
    updatedStayTotal,
    handleBack,
    handleNext,
    handleCheckInChange,
  } = useEditReservationDialog({
    open,
    canModify,
    roomCapacity,
    isBusy,
    nightlyRate,
    editForm,
    editFormHasValidRange,
    editStayLength,
    editConflict,
    isLoadingDetails,
    showDirectReservationFields,
    onFieldChange,
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={showDirectReservationFields ? 'md' : 'sm'}
    >
      <DialogTitle>{t('hotelPortal.booking.editReservation', 'Edit reservation')}</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Alert severity={canModify ? 'info' : 'warning'}>
            {canModify
              ? t('hotelPortal.booking.editWithin24h', 'You can edit this reservation because it is still within the first 24 hours.')
              : t('hotelPortal.booking.edit24hExpired', 'The 24-hour modification window has already ended.')}
          </Alert>

          {isLoadingDetails ? (
            <Alert severity="info">{t('hotelPortal.booking.loadingReservationDetails', 'Loading reservation details...')}</Alert>
          ) : null}

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {showDirectReservationFields && activeStep === 0 ? (
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={700}>
                {t('hotelPortal.booking.guestInformation', 'Guest information')}
              </Typography>

              <TextField
                fullWidth
                size="small"
                label={t('hotelPortal.booking.guestFullName', 'Guest Full Name')}
                value={editForm.guestFullName ?? ''}
                disabled={!canEditGuestFullName}
                onChange={event => onFieldChange('guestFullName', event.target.value)}
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  label={t('hotelPortal.booking.guestPhone', 'Guest Phone')}
                  value={editForm.guestPhone ?? ''}
                  onChange={event => onFieldChange('guestPhone', event.target.value)}
                />

                <TextField
                  fullWidth
                  size="small"
                  label={t('hotelPortal.booking.guestIdNumber', 'Guest ID Number')}
                  value={editForm.guestIdNumber ?? ''}
                  onChange={event => onFieldChange('guestIdNumber', event.target.value)}
                />
              </Stack>
            </Stack>
          ) : null}

          {activeStep === stayStepIndex ? (
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={700}>
                {t('hotelPortal.booking.stayDetails', 'Stay details')}
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                label={t('hotelPortal.booking.room', 'Room')}
                value={editForm.roomId}
                onChange={event => onFieldChange('roomId', event.target.value)}
              >
                {roomOptions.map(option => (
                  <MenuItem key={option.id} value={option.id} disabled={option.disabled}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <DatePickerField
                label={t('hotelPortal.booking.checkIn', 'Check-in')}
                value={editForm.checkIn}
                minDate={minCheckInDate}
                onChange={handleCheckInChange}
              />

              <DatePickerField
                label={t('hotelPortal.booking.checkOut', 'Check-out')}
                value={editForm.checkOut}
                minDate={minCheckOutDate}
                onChange={value => onFieldChange('checkOut', value)}
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label={t('hotelPortal.booking.guests', 'Guests')}
                  value={editForm.guests}
                  inputProps={{ min: 1, max: roomCapacity }}
                  onChange={event => onFieldChange('guests', Number(event.target.value))}
                />

                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label={t('hotelPortal.booking.rooms', 'Rooms')}
                  value={editForm.rooms}
                  inputProps={{ min: 1 }}
                  onChange={event => onFieldChange('rooms', Number(event.target.value))}
                />
              </Stack>

              {!editFormHasValidRange ? (
                <Alert severity="error">
                  {t('hotelPortal.booking.checkOutAfterCheckIn', 'Check-out must be later than check-in by at least one day.')}
                </Alert>
              ) : null}

              {editForm.guests > roomCapacity ? (
                <Alert severity="error">
                  {t('hotelPortal.booking.guestsExceedCapacity', { capacity: roomCapacity, defaultValue: 'This room can host up to {{capacity}} guests.' })}
                </Alert>
              ) : null}

              {editConflict != null ? (
                <Alert severity="error">
                  {t('hotelPortal.booking.editConflict', { checkIn: editConflict.checkIn, checkOut: editConflict.checkOut, defaultValue: 'The updated dates conflict with another reservation from {{checkIn}} until {{checkOut}}.' })}
                </Alert>
              ) : null}
            </Stack>
          ) : null}

          {showDirectReservationFields && activeStep === 2 ? (
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={700}>
                {t('hotelPortal.booking.reservationDetails', 'Reservation details')}
              </Typography>

              {showReservationSourceField ? (
                <TextField
                  select
                  fullWidth
                  size="small"
                  label={t('hotelPortal.booking.reservationSource', 'Reservation Source')}
                  value={editForm.source ?? ''}
                  onChange={event =>
                    onFieldChange('source', event.target.value as ReservationSource)
                  }
                >
                  {Object.values(ReservationSource).map(source => (
                    <MenuItem key={source} value={source}>
                      {source}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}

              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!editForm.hasInsurance}
                    onChange={event => onFieldChange('hasInsurance', event.target.checked)}
                  />
                }
                label={t('hotelPortal.booking.hasInsurance', 'Has insurance')}
              />

              <TextField
                fullWidth
                size="small"
                label={t('hotelPortal.booking.specialRequests', 'Special Requests')}
                value={editForm.specialRequests ?? ''}
                multiline
                minRows={3}
                onChange={event => onFieldChange('specialRequests', event.target.value)}
              />

              <TextField
                fullWidth
                size="small"
                label={t('hotelPortal.booking.notes', 'Notes')}
                value={editForm.notes ?? ''}
                multiline
                minRows={3}
                onChange={event => onFieldChange('notes', event.target.value)}
              />
            </Stack>
          ) : null}

          {!showDirectReservationFields && activeStep === 1 ? (
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={700}>
                {t('hotelPortal.booking.reviewChanges', 'Review changes')}
              </Typography>

              <Stack spacing={1}>
                <Typography variant="body2">
                  {t('hotelPortal.booking.room', 'Room')}:{' '}
                  <Typography component="span" variant="body2" fontWeight={700}>
                    {selectedRoomLabel}
                  </Typography>
                </Typography>
                <Typography variant="body2">
                  {t('hotelPortal.booking.checkIn', 'Check-in')}:{' '}
                  <Typography component="span" variant="body2" fontWeight={700}>
                    {editForm.checkIn}
                  </Typography>
                </Typography>
                <Typography variant="body2">
                  {t('hotelPortal.booking.checkOut', 'Check-out')}:{' '}
                  <Typography component="span" variant="body2" fontWeight={700}>
                    {editForm.checkOut}
                  </Typography>
                </Typography>
                <Typography variant="body2">
                  {t('hotelPortal.booking.guests', 'Guests')}:{' '}
                  <Typography component="span" variant="body2" fontWeight={700}>
                    {editForm.guests}
                  </Typography>
                </Typography>
                <Typography variant="body2">
                  {t('hotelPortal.booking.rooms', 'Rooms')}:{' '}
                  <Typography component="span" variant="body2" fontWeight={700}>
                    {editForm.rooms}
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          ) : null}

          <Typography variant="body2">
            {t('hotelPortal.booking.updatedStayTotal', 'Updated stay total:')}{' '}
            <Typography component="span" variant="body2" fontWeight={700} color="text.primary">
              {formatCurrency(updatedStayTotal, language, currency)}
            </Typography>
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          {t('common.cancel', 'Close')}
        </Button>
        <Button disabled={activeStep === 0 || isBusy} onClick={handleBack}>
          {t('hotelPortal.booking.back', 'Back')}
        </Button>
        {isLastStep ? (
          <Button
            variant="contained"
            disabled={isSaveDisabled}
            onClick={onSave}
          >
            {t('hotelPortal.booking.saveChanges', 'Save changes')}
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={!isCurrentStepValid || isLoadingDetails || isBusy}
            onClick={handleNext}
          >
            {t('hotelPortal.booking.next', 'Next')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

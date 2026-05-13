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
import { DatePickerField } from '@/components/common/DatePickerField'
import { ReservationSource } from '@/app/(home)/reservations/[hotelId]/config/reservationConfig'
import {
  type EditReservationFieldKey,
  type EditReservationFormState,
  useEditReservationDialog,
} from '../hooks/useEditReservationDialog'
import type { ReservationEditRoomOption } from '../hooks/useReservationEdit'
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
  onClose,
  onSave,
  onFieldChange,
}: EditReservationDialogProps) {
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
      <DialogTitle>Edit reservation</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Alert severity={canModify ? 'info' : 'warning'}>
            {canModify
              ? 'You can edit this reservation because it is still within the first 24 hours.'
              : 'The 24-hour modification window has already ended.'}
          </Alert>

          {isLoadingDetails ? (
            <Alert severity="info">Loading reservation details...</Alert>
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
                Guest information
              </Typography>

              <TextField
                fullWidth
                size="small"
                label="Guest Full Name"
                value={editForm.guestFullName ?? ''}
                onChange={event => onFieldChange('guestFullName', event.target.value)}
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Guest Phone"
                  value={editForm.guestPhone ?? ''}
                  onChange={event => onFieldChange('guestPhone', event.target.value)}
                />

                <TextField
                  fullWidth
                  size="small"
                  label="Guest ID Number"
                  value={editForm.guestIdNumber ?? ''}
                  onChange={event => onFieldChange('guestIdNumber', event.target.value)}
                />
              </Stack>
            </Stack>
          ) : null}

          {activeStep === stayStepIndex ? (
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={700}>
                Stay details
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                label="Room"
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
                label="Check-in"
                value={editForm.checkIn}
                minDate={minCheckInDate}
                onChange={handleCheckInChange}
              />

              <DatePickerField
                label="Check-out"
                value={editForm.checkOut}
                minDate={minCheckOutDate}
                onChange={value => onFieldChange('checkOut', value)}
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Guests"
                  value={editForm.guests}
                  inputProps={{ min: 1, max: roomCapacity }}
                  onChange={event => onFieldChange('guests', Number(event.target.value))}
                />

                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Rooms"
                  value={editForm.rooms}
                  inputProps={{ min: 1 }}
                  onChange={event => onFieldChange('rooms', Number(event.target.value))}
                />
              </Stack>

              {!editFormHasValidRange ? (
                <Alert severity="error">
                  Check-out must be later than check-in by at least one day.
                </Alert>
              ) : null}

              {editForm.guests > roomCapacity ? (
                <Alert severity="error">
                  This room can host up to {roomCapacity} guest{roomCapacity === 1 ? '' : 's'}.
                </Alert>
              ) : null}

              {editConflict != null ? (
                <Alert severity="error">
                  The updated dates conflict with another reservation from {editConflict.checkIn} until{' '}
                  {editConflict.checkOut}.
                </Alert>
              ) : null}
            </Stack>
          ) : null}

          {showDirectReservationFields && activeStep === 2 ? (
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={700}>
                Reservation details
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                label="Reservation Source"
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

              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!editForm.hasInsurance}
                    onChange={event => onFieldChange('hasInsurance', event.target.checked)}
                  />
                }
                label="Has insurance"
              />

              <TextField
                fullWidth
                size="small"
                label="Special Requests"
                value={editForm.specialRequests ?? ''}
                multiline
                minRows={3}
                onChange={event => onFieldChange('specialRequests', event.target.value)}
              />

              <TextField
                fullWidth
                size="small"
                label="Notes"
                value={editForm.notes ?? ''}
                multiline
                minRows={3}
                onChange={event => onFieldChange('notes', event.target.value)}
              />
            </Stack>
          ) : null}

          <Typography variant="body2">
            Updated stay total:{' '}
            <Typography component="span" variant="body2" fontWeight={700} color="text.primary">
              {formatCurrency(updatedStayTotal, language, currency)}
            </Typography>
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Close
        </Button>
        <Button disabled={activeStep === 0 || isBusy} onClick={handleBack}>
          Back
        </Button>
        {isLastStep ? (
          <Button
            variant="contained"
            disabled={isSaveDisabled}
            onClick={onSave}
          >
            Save changes
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={!isCurrentStepValid || isLoadingDetails || isBusy}
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

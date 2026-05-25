'use client'

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { DatePickerField } from '@/components/common/DatePickerField'
import { getStayLength, formatCurrency } from '../utils/roomBooking'

interface ExtendReservationDialogProps {
  open: boolean
  currentCheckOut: string
  extendPrice: number
  language: string
  currency: string
  extendCheckOut: string
  extendHasValidRange: boolean
  extendConflict: {
    checkIn: string
    checkOut: string
  } | null
  isBusy: boolean
  onClose: () => void
  onConfirm: () => void
  onCheckOutChange: (value: string) => void
}

export function ExtendReservationDialog({
  open,
  currentCheckOut,
  extendPrice,
  language,
  currency,
  extendCheckOut,
  extendHasValidRange,
  extendConflict,
  isBusy,
  onClose,
  onConfirm,
  onCheckOutChange
}: ExtendReservationDialogProps) {
  const { t } = useTranslation()
  const extraNights = getStayLength(currentCheckOut, extendCheckOut)
  const extensionTotal = extraNights * extendPrice

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{t('hotelPortal.booking.extendReservation', { defaultValue: 'Extend reservation' })}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Alert severity='info'>
            {t('hotelPortal.booking.extendInfo', {
              defaultValue: 'Extend the reservation only if no other booking exists after your current check-out.'
            })}
          </Alert>

          <DatePickerField
            label={t('hotelPortal.booking.newCheckOut', { defaultValue: 'New check-out' })}
            value={extendCheckOut}
            minDate={dayjs(currentCheckOut).add(1, 'day').format('YYYY-MM-DD')}
            onChange={onCheckOutChange}
          />

          {!extendHasValidRange ? (
            <Alert severity='error'>
              {t('hotelPortal.booking.extendInvalidRange', {
                defaultValue: 'The new check-out date must be later than your current check-out.'
              })}
            </Alert>
          ) : null}

          {extendConflict != null ? (
            <Alert severity='error'>
              {t('hotelPortal.booking.extendConflict', {
                checkIn: extendConflict.checkIn,
                checkOut: extendConflict.checkOut,
                defaultValue:
                  'Extension is not available because this room is already booked from {{checkIn}} until {{checkOut}}.'
              })}
            </Alert>
          ) : null}

          <Stack spacing={0.75}>
            <Typography variant='body2' color='text.secondary'>
              {t('hotelPortal.booking.extraNights', { defaultValue: 'Extra nights:' })}{' '}
              <Typography component='span' variant='body2' fontWeight={700} color='text.primary'>
                {extraNights}
              </Typography>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {t('hotelPortal.booking.extensionPrice', { defaultValue: 'Extension price:' })}{' '}
              <Typography component='span' variant='body2' fontWeight={700} color='text.primary'>
                {formatCurrency(extendPrice, language, currency)}
              </Typography>
            </Typography>
          </Stack>

          <Typography variant='body2'>
            {t('hotelPortal.booking.extensionTotal', { defaultValue: 'Extension total:' })}{' '}
            <Typography component='span' variant='body2' fontWeight={700} color='text.primary'>
              {formatCurrency(extensionTotal, language, currency)}
            </Typography>
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color='inherit' onClick={onClose}>
          {t('common.cancel', { defaultValue: 'Close' })}
        </Button>
        <Button
          variant='contained'
          disabled={!extendHasValidRange || extendConflict != null || isBusy}
          onClick={onConfirm}
        >
          {t('hotelPortal.booking.confirmExtension', { defaultValue: 'Confirm extension' })}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

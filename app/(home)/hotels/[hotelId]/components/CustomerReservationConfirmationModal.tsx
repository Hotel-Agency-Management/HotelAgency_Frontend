'use client'

import { Alert, Box, Button, Divider, Modal, Paper, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import useLanguage from '@/core/hooks/useLanguage'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { BOOKING_CONFIRMATION_STEP_IDS } from '../constants/customerReservationConfirmation'
import { useCustomerReservationConfirmationModal } from '../hooks/useCustomerReservationConfirmationModal'
import type {
  CustomerReservationConfirmationPayload,
  ReservationDetails
} from '../types/customerReservationConfirmation'
import { ConfirmationStepContent } from './customerReservationConfirmation/ConfirmationStepContent'

interface CustomerReservationConfirmationModalProps {
  open: boolean
  hotelId: string
  hotel: CustomerHotel | null
  room: Pick<
    RoomProfile,
    'type' | 'capacity' | 'pricePerNight' | 'extendPrice' | 'yearlyInsurance' | 'insurancePerReservation'
  >
  reservation: ReservationDetails
  confirming?: boolean
  onClose: () => void
  onConfirm: (payload: CustomerReservationConfirmationPayload) => void
}

export function CustomerReservationConfirmationModal({
  open,
  hotelId,
  hotel,
  room,
  reservation,
  confirming = false,
  onClose,
  onConfirm
}: CustomerReservationConfirmationModalProps) {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const rtlFlip: React.CSSProperties = language === 'ar' ? { transform: 'scaleX(-1)' } : {}
  const stepLabelMap: Record<string, string> = {
    'Booking Details': t('hotelPortal.booking.stepBookingDetails', { defaultValue: 'Booking Details' }),
    'Terms & Conditions': t('hotelPortal.booking.stepTerms', { defaultValue: 'Terms & Conditions' }),
    'Contract Preview': t('hotelPortal.booking.stepContractPreview', { defaultValue: 'Contract Preview' }),
    Signature: t('hotelPortal.booking.stepSignature', { defaultValue: 'Signature' }),
    'Review & Confirm': t('hotelPortal.booking.stepReviewConfirm', { defaultValue: 'Review & Confirm' })
  }
  const modalState = useCustomerReservationConfirmationModal({
    open,
    hotelId,
    hotel,
    room,
    reservation,
    onConfirm
  })

  return (
    <Modal
      open={open}
      onClose={confirming ? undefined : onClose}
      aria-labelledby='customer-reservation-confirmation-title'
      aria-describedby='customer-reservation-confirmation-step'
    >
      <Paper elevation={8} variant='customerReservationConfirmationModal'>
        <Box className='customer-reservation-confirmation-header'>
          <Stack spacing={0.5}>
            <Typography id='customer-reservation-confirmation-title' variant='h6'>
              {t('hotelPortal.booking.confirmYourReservation', { defaultValue: 'Confirm your reservation' })}
            </Typography>
            <Typography id='customer-reservation-confirmation-step' variant='body2'>
              {stepLabelMap[modalState.currentStepLabel] ?? modalState.currentStepLabel}
            </Typography>
          </Stack>
        </Box>

        <Divider />

        <Box className='customer-reservation-confirmation-body'>
          <Stack spacing={3}>
            <Stepper activeStep={modalState.activeStep} alternativeLabel>
              {modalState.steps.map(step => (
                <Step key={step.id}>
                  <StepLabel>{stepLabelMap[step.label] ?? step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {modalState.stepError &&
            modalState.currentStepId !== BOOKING_CONFIRMATION_STEP_IDS.CONTRACT_PREVIEW &&
            modalState.currentStepId !== BOOKING_CONFIRMATION_STEP_IDS.SIGNATURE ? (
              <Alert severity='warning'>{modalState.stepError}</Alert>
            ) : null}

            <ConfirmationStepContent
              stepId={modalState.currentStepId}
              modalState={modalState}
              reservation={reservation}
            />
          </Stack>
        </Box>

        <Divider />

        <Stack className='customer-reservation-confirmation-actions' direction='row' spacing={1.25} alignItems='center'>
          <Button color='secondary' onClick={onClose} disabled={confirming}>
            {t('common.cancel', { defaultValue: 'Cancel' })}
          </Button>
          <Box className='customer-reservation-confirmation-spacer' />
          <Button
            color='secondary'
            startIcon={<ArrowLeft size={16} style={rtlFlip} />}
            onClick={modalState.handleBack}
            disabled={modalState.isFirstStep || confirming}
          >
            {t('hotelPortal.booking.back', { defaultValue: 'Back' })}
          </Button>
          {modalState.isFinalStep ? (
            <Button
              variant='contained'
              color='secondary'
              startIcon={<CheckCircle2 size={16} />}
              onClick={modalState.handleConfirm}
              disabled={
                !modalState.termsAccepted ||
                !modalState.signatureDataUrl ||
                modalState.documentsGenerating ||
                confirming
              }
            >
              {modalState.documentsGenerating
                ? t('hotelPortal.booking.preparingDocuments', { defaultValue: 'Preparing documents...' })
                : t('hotelPortal.booking.confirmReservation', { defaultValue: 'Confirm reservation' })}
            </Button>
          ) : (
            <Button
              variant='contained'
              color='secondary'
              endIcon={<ArrowRight size={16} style={rtlFlip} />}
              onClick={modalState.handleNext}
              disabled={confirming}
            >
              {t('hotelPortal.booking.next', { defaultValue: 'Next' })}
            </Button>
          )}
        </Stack>
      </Paper>
    </Modal>
  )
}

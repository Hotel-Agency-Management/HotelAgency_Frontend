'use client'

import {
  Alert,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import type { RoomProfile } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/types'
import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import { BOOKING_CONFIRMATION_STEP_IDS } from '../constants/customerReservationConfirmation'
import { useCustomerReservationConfirmationModal } from '../hooks/useCustomerReservationConfirmationModal'
import type {
  CustomerReservationConfirmationPayload,
  ReservationDetails,
} from '../types/customerReservationConfirmation'
import { ConfirmationStepContent } from './customerReservationConfirmation/ConfirmationStepContent'
import {
  ConfirmationActions,
  ConfirmationBody,
  ConfirmationHeader,
  ConfirmationSpacer,
} from './customerReservationConfirmation/StyledComponents'

interface CustomerReservationConfirmationModalProps {
  open: boolean
  hotelId: string
  hotel: CustomerHotel | null
  room: Pick<RoomProfile, 'type' | 'capacity' | 'pricePerNight' | 'extendPrice'>
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
  onConfirm,
}: CustomerReservationConfirmationModalProps) {
  const modalState = useCustomerReservationConfirmationModal({
    open,
    hotelId,
    hotel,
    room,
    reservation,
    onConfirm,
  })

  return (
    <Modal
      open={open}
      onClose={confirming ? undefined : onClose}
      aria-labelledby="customer-reservation-confirmation-title"
      aria-describedby="customer-reservation-confirmation-step"
    >
      <Paper elevation={8} variant="customerReservationConfirmationModal">
        <ConfirmationHeader>
          <Stack spacing={0.5}>
            <Typography id="customer-reservation-confirmation-title" variant="h6">
              Confirm your reservation
            </Typography>
            <Typography
              id="customer-reservation-confirmation-step"
              variant="body2"
            >
              {modalState.currentStepLabel}
            </Typography>
          </Stack>
        </ConfirmationHeader>

        <Divider />

        <ConfirmationBody>
          <Stack spacing={3}>
            <Stepper activeStep={modalState.activeStep} alternativeLabel>
              {modalState.steps.map(step => (
                <Step key={step.id}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {modalState.stepError &&
            modalState.currentStepId !== BOOKING_CONFIRMATION_STEP_IDS.CONTRACT_PREVIEW &&
            modalState.currentStepId !== BOOKING_CONFIRMATION_STEP_IDS.SIGNATURE ? (
              <Alert severity="warning">{modalState.stepError}</Alert>
            ) : null}

            <ConfirmationStepContent
              stepId={modalState.currentStepId}
              modalState={modalState}
              reservation={reservation}
            />
          </Stack>
        </ConfirmationBody>

        <Divider />

        <ConfirmationActions direction="row" spacing={1.25} alignItems="center">
          <Button color="secondary" onClick={onClose} disabled={confirming}>
            Cancel
          </Button>
          <ConfirmationSpacer />
          <Button
            color="secondary"
            startIcon={<ArrowLeft size={16} />}
            onClick={modalState.handleBack}
            disabled={modalState.isFirstStep || confirming}
          >
            Back
          </Button>
          {modalState.isFinalStep ? (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CheckCircle2 size={16} />}
              onClick={modalState.handleConfirm}
              disabled={!modalState.termsAccepted || !modalState.signatureDataUrl || confirming}
            >
              Confirm reservation
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ArrowRight size={16} />}
              onClick={modalState.handleNext}
              disabled={confirming}
            >
              Next
            </Button>
          )}
        </ConfirmationActions>
      </Paper>
    </Modal>
  )
}

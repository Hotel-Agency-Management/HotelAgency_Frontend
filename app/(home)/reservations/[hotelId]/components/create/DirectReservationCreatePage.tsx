import { Chip, Grid, Stack, Typography } from '@mui/material'
import { BedDouble, PhoneCall, ReceiptText } from 'lucide-react'
import { DirectReservationForm } from './DirectReservationForm'
import { ReservationSummaryCard } from './ReservationSummaryCard'
import { GradientCard } from '../../styles/StyledComponents'
import { useDirectReservationCreatePage } from '../../hooks/useDirectReservationCreatePage'

interface DirectReservationCreatePageProps {
  hotelId: number
}

export default function DirectReservationCreatePage({
  hotelId,
}: DirectReservationCreatePageProps) {
  const {
    control,
    errors,
    hasContract,
    hasInvoice,
    isSubmitting,
    rooms,
    roomsLoading,
    reservationSnapshot,
    handleFormSubmit,
    handleBeforeNextStep,
    trigger,
  } = useDirectReservationCreatePage(hotelId)

  return (
    <Stack spacing={3.5}>
      <GradientCard variant='card'>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
            <Chip icon={<PhoneCall size={14} />} label='Phone & Walk-in' variant='outlined' />
            <Chip icon={<BedDouble size={14} />} label='Hotel Reservation' variant='outlined' />
            <Chip icon={<ReceiptText size={14} />} label='Payment Tracking' variant='outlined' />
          </Stack>

          <Stack spacing={1}>
            <Typography variant='h4' fontWeight={800}>
              Create a hotel reservation
            </Typography>
            <Typography variant='body1' maxWidth={760}>
              Capture walk-in and phone reservations with guest details, stay dates, room selection, and payment in a guided step-by-step flow.
            </Typography>
          </Stack>
        </Stack>
      </GradientCard>

      <Grid container spacing={3.5} >
        <Grid size={{ xs: 12, lg: 8 }}>
          <DirectReservationForm
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            onSubmit={handleFormSubmit}
            trigger={trigger}
            rooms={rooms}
            roomsLoading={roomsLoading}
            hasContract={hasContract}
            hasInvoice={hasInvoice}
            guestFullName={reservationSnapshot.guestFullName}
            checkInDate={reservationSnapshot.checkInDate}
            checkOutDate={reservationSnapshot.checkOutDate}
            roomNumbers={reservationSnapshot.roomNumbers}
            totalAmount={reservationSnapshot.totalAmount}
            onBeforeNextStep={handleBeforeNextStep}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <ReservationSummaryCard snapshot={reservationSnapshot} />
        </Grid>
      </Grid>
    </Stack>
  )
}

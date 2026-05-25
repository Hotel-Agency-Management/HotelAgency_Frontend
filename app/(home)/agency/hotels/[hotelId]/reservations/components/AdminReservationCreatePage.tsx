'use client'

import { Chip, Grid, Stack, Typography } from '@mui/material'
import { BedDouble, PhoneCall, ReceiptText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { DirectReservationForm } from '@/app/(home)/reservations/[hotelId]/components/create/DirectReservationForm'
import { ReservationSummaryCard } from '@/app/(home)/reservations/[hotelId]/components/create/ReservationSummaryCard'
import { GradientCard } from '@/app/(home)/reservations/[hotelId]/styles/StyledComponents'
import { useAdminDirectReservationCreatePage } from '../hooks/useAdminDirectReservationCreatePage'

interface AdminReservationCreatePageProps {
  hotelId: number
}

export default function AdminReservationCreatePage({ hotelId }: AdminReservationCreatePageProps) {
  const { t } = useTranslation()
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
    trigger
  } = useAdminDirectReservationCreatePage(hotelId)

  return (
    <Stack spacing={3.5}>
      <GradientCard variant='card'>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
            <Chip
              icon={<PhoneCall size={14} />}
              label={t('reservations.create_page.chipPhone', { defaultValue: 'Phone & Walk-in' })}
              variant='outlined'
            />
            <Chip
              icon={<BedDouble size={14} />}
              label={t('reservations.create_page.chipHotel', { defaultValue: 'Hotel Reservation' })}
              variant='outlined'
            />
            <Chip
              icon={<ReceiptText size={14} />}
              label={t('reservations.create_page.chipPayment', { defaultValue: 'Payment Tracking' })}
              variant='outlined'
            />
          </Stack>

          <Stack spacing={1}>
            <Typography variant='h4' fontWeight={800}>
              {t('reservations.create_page.heading', { defaultValue: 'Create a hotel reservation' })}
            </Typography>
            <Typography variant='body1' maxWidth={760}>
              {t('reservations.create_page.description', {
                defaultValue:
                  'Capture walk-in and phone reservations with guest details, stay dates, room selection, and payment in a guided step-by-step flow.'
              })}
            </Typography>
          </Stack>
        </Stack>
      </GradientCard>

      <Grid container spacing={3.5}>
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

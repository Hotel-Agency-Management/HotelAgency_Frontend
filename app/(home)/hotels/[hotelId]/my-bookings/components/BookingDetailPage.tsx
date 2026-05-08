'use client'

import { Button, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/loaders/Spinner'
import { useMyBookingDetail } from '../hooks/useMyBookingDetail'
import { BookingHeaderPaper } from '../styles/StyledComponents'
import { BookingStatusChip } from './BookingStatusChip'
import { InfoRow } from './InfoRow'
import { SectionPaper } from './SectionPaper'

export function BookingDetailPage() {
  const params = useParams<{ hotelId?: string; reservationId?: string }>()
  const hotelId = params.hotelId ? decodeURIComponent(params.hotelId) : ''
  const reservationId = params.reservationId ? decodeURIComponent(params.reservationId) : ''
  const router = useRouter()
  const { t } = useTranslation()
  const { booking, isLoading, isError } = useMyBookingDetail(hotelId, reservationId)

  if (isLoading) {
    return (
      <Stack justifyContent="center">
        <Spinner />
      </Stack>
    )
  }

  if (isError || !booking) {
    return (
      <Container maxWidth="md">
        <Stack spacing={2}>
          <Button
            startIcon={<Icon icon="lucide:arrow-left" />}
            onClick={() => router.push(`/hotels/${hotelId}/my-bookings`)}
            sx={{ alignSelf: 'flex-start' }}
          >
            {t('myBookings.backToList')}
          </Button>
          <ErrorMessage message={t('myBookings.loadError')} />
        </Stack>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Button
          startIcon={<Icon icon="lucide:arrow-left" />}
          onClick={() => router.push(`/hotels/${hotelId}/my-bookings`)}
          sx={{ alignSelf: 'flex-start' }}
        >
          {t('myBookings.backToList')}
        </Button>

        <BookingHeaderPaper variant="outlined">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                {t('myBookings.reservationNumber')}
              </Typography>
              <Typography variant="h5" fontWeight={800}>
                {booking.reservationNumber}
              </Typography>
              <Typography variant="body2">
                {booking.hotelName}
              </Typography>
            </Stack>
            <BookingStatusChip status={booking.status} />
          </Stack>
        </BookingHeaderPaper>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper icon="lucide:calendar-check" title={t('myBookings.stayDetails')}>
              <InfoRow label={t('myBookings.hotel')} value={booking.hotelName} />
              <InfoRow label={t('myBookings.rooms')} value={booking.roomNumbers.join(', ')} />
              <InfoRow label={t('myBookings.checkIn')} value={booking.checkInDate} />
              <InfoRow label={t('myBookings.checkOut')} value={booking.checkOutDate} />
              <InfoRow label={t('myBookings.guests')} value={booking.numberOfGuests} />
              <InfoRow label={t('myBookings.numberOfRooms')} value={booking.numberOfRooms} />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper icon="lucide:user" title={t('myBookings.guestDetails')}>
              <InfoRow label={t('myBookings.guestName')} value={booking.guestFullName} />
              <InfoRow label={t('myBookings.guestEmail')} value={booking.guestEmail} />
              <InfoRow label={t('myBookings.guestPhone')} value={booking.guestPhone} />
              <InfoRow label={t('myBookings.guestId')} value={booking.guestIdNumber} />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper icon="lucide:clipboard-list" title={t('myBookings.bookingInfo')}>
              <InfoRow label={t('myBookings.source')} value={booking.source} />
              <InfoRow label={t('myBookings.specialRequests')} value={booking.specialRequests} />
              <InfoRow label={t('myBookings.notes')} value={booking.notes} />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              <SectionPaper icon="lucide:badge-dollar-sign" title={t('myBookings.financial')}>
                <InfoRow
                  label={t('myBookings.totalAmount')}
                  value={booking.totalAmount.toLocaleString()}
                  emphasized
                />
              </SectionPaper>

              {(booking.contractUrl || booking.invoiceUrl) && (
                <SectionPaper icon="lucide:file-text" title={t('myBookings.documents')}>
                  <Stack spacing={1.5}>
                    {booking.contractUrl && (
                      <Link href={booking.contractUrl} target="_blank" rel="noopener noreferrer" underline="hover">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Icon icon="lucide:file-text" fontSize={15} />
                          <Typography component="span" variant="body2">
                            {t('myBookings.downloadContract')}
                          </Typography>
                        </Stack>
                      </Link>
                    )}
                    {booking.invoiceUrl && (
                      <Link href={booking.invoiceUrl} target="_blank" rel="noopener noreferrer" underline="hover">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Icon icon="lucide:receipt" fontSize={15} />
                          <Typography component="span" variant="body2">
                            {t('myBookings.downloadInvoice')}
                          </Typography>
                        </Stack>
                      </Link>
                    )}
                  </Stack>
                </SectionPaper>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}

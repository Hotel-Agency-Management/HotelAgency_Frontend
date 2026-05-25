'use client'

import { Button, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import DirectionalIcon from '@/components/common/DirectionalIcon'
import LtrText from '@/components/ui/LtrText'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/loaders/Spinner'
import { BookingHeaderPaper } from '@/app/(home)/hotels/[hotelId]/my-bookings/styles/StyledComponents'
import { BookingStatusChip } from '@/app/(home)/hotels/[hotelId]/my-bookings/components/BookingStatusChip'
import { InfoRow } from '@/app/(home)/hotels/[hotelId]/my-bookings/components/InfoRow'
import { SectionPaper } from '@/app/(home)/hotels/[hotelId]/my-bookings/components/SectionPaper'
import { resolveBlobUrl } from '@/core/constant/blobStorage'
import { useReservationById } from '../../hooks/queries/reservationQueries'

export function ReservationDetailsPage() {
  const params = useParams<{ hotelId?: string; reservationId?: string }>()
  const router = useRouter()
  const { t } = useTranslation()
  const hotelId = Number(params.hotelId)
  const reservationId = Number(params.reservationId)
  const { data: reservation, isLoading, isError } = useReservationById(hotelId, reservationId)
  const backHref = `/reservations/${params.hotelId ?? ''}/list`
  const contractHref = resolveBlobUrl(reservation?.contractUrl)
  const invoiceHref = resolveBlobUrl(reservation?.invoiceUrl)

  if (isLoading) {
    return (
      <Stack justifyContent='center'>
        <Spinner />
      </Stack>
    )
  }

  if (isError || !reservation) {
    return (
      <Container maxWidth='md'>
        <Stack spacing={2}>
          <Button
            startIcon={<DirectionalIcon icon='lucide:arrow-left' />}
            onClick={() => router.push(backHref)}
            sx={{ alignSelf: 'flex-start' }}
          >
            {t('reservations.details.backToReservations', { defaultValue: 'Back to reservations' })}
          </Button>
          <ErrorMessage
            message={t('reservations.details.failedToLoad', { defaultValue: 'Failed to load reservation details.' })}
          />
        </Stack>
      </Container>
    )
  }

  return (
    <Container maxWidth='lg'>
      <Stack spacing={3}>
        <Button
          startIcon={<DirectionalIcon icon='lucide:arrow-left' />}
          onClick={() => router.push(backHref)}
          sx={{ alignSelf: 'flex-start' }}
        >
          {t('reservations.details.backToReservations', { defaultValue: 'Back to reservations' })}
        </Button>

        <BookingHeaderPaper variant='outlined'>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Stack spacing={0.5}>
              <Typography variant='caption' fontWeight={500}>
                {t('reservations.details.reservationNumber', { defaultValue: 'Reservation Number' })}
              </Typography>
              <Typography variant='h5' fontWeight={800}>
                {reservation.reservationNumber}
              </Typography>
              <Typography variant='body2'>{reservation.hotelName}</Typography>
            </Stack>
            <BookingStatusChip status={reservation.status} />
          </Stack>
        </BookingHeaderPaper>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper
              icon='lucide:calendar-check'
              title={t('reservations.details.stayDetails', { defaultValue: 'Stay Details' })}
            >
              <InfoRow
                label={t('reservations.details.hotel', { defaultValue: 'Hotel' })}
                value={reservation.hotelName}
              />
              <InfoRow
                label={t('reservations.details.rooms', { defaultValue: 'Rooms' })}
                value={reservation.roomNumbers.join(', ')}
              />
              <InfoRow
                label={t('reservations.details.checkIn', { defaultValue: 'Check-In' })}
                value={reservation.checkInDate}
              />
              <InfoRow
                label={t('reservations.details.checkOut', { defaultValue: 'Check-Out' })}
                value={reservation.checkOutDate}
              />
              <InfoRow
                label={t('reservations.details.guests', { defaultValue: 'Guests' })}
                value={reservation.numberOfGuests}
              />
              <InfoRow
                label={t('reservations.details.numberOfRooms', { defaultValue: 'Number of Rooms' })}
                value={reservation.numberOfRooms}
              />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper
              icon='lucide:user'
              title={t('reservations.details.guestDetails', { defaultValue: 'Guest Details' })}
            >
              <InfoRow
                label={t('reservations.details.name', { defaultValue: 'Name' })}
                value={reservation.guestFullName}
              />
              <InfoRow
                label={t('reservations.details.email', { defaultValue: 'Email' })}
                value={reservation.guestEmail}
              />
              <InfoRow
                label={t('reservations.details.phone', { defaultValue: 'Phone' })}
                value={<LtrText>{reservation.guestPhone}</LtrText>}
              />
              <InfoRow
                label={t('reservations.details.idNumber', { defaultValue: 'ID Number' })}
                value={reservation.guestIdNumber ?? '-'}
              />
              <InfoRow
                label={t('reservations.details.customerId', { defaultValue: 'Customer ID' })}
                value={reservation.customerId}
              />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper
              icon='lucide:clipboard-list'
              title={t('reservations.details.bookingInfo', { defaultValue: 'Booking Info' })}
            >
              <InfoRow
                label={t('reservations.details.reservationId', { defaultValue: 'Reservation ID' })}
                value={reservation.id}
              />
              <InfoRow
                label={t('reservations.details.hotelId', { defaultValue: 'Hotel ID' })}
                value={reservation.hotelId}
              />
              <InfoRow
                label={t('reservations.details.source', { defaultValue: 'Source' })}
                value={reservation.source}
              />
              <InfoRow
                label={t('reservations.details.specialRequests', { defaultValue: 'Special Requests' })}
                value={reservation.specialRequests}
              />
              <InfoRow label={t('reservations.details.notes', { defaultValue: 'Notes' })} value={reservation.notes} />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              <SectionPaper
                icon='lucide:badge-dollar-sign'
                title={t('reservations.details.financial', { defaultValue: 'Financial' })}
              >
                <InfoRow
                  label={t('reservations.details.totalAmount', { defaultValue: 'Total Amount' })}
                  value={reservation.totalAmount}
                  emphasized
                />
                <InfoRow
                  label={t('reservations.details.hasInsurance', { defaultValue: 'Has Insurance' })}
                  value={
                    reservation.hasInsurance
                      ? t('reservations.details.yes', { defaultValue: 'Yes' })
                      : t('reservations.details.no', { defaultValue: 'No' })
                  }
                />
                <InfoRow
                  label={t('reservations.details.insuranceAmount', { defaultValue: 'Insurance Amount' })}
                  value={reservation.insuranceAmount}
                />
              </SectionPaper>

              {(contractHref || invoiceHref) && (
                <SectionPaper
                  icon='lucide:file-text'
                  title={t('reservations.details.documents', { defaultValue: 'Documents' })}
                >
                  <Stack spacing={1.5}>
                    {contractHref && (
                      <Link href={contractHref} target='_blank' rel='noopener noreferrer' underline='hover'>
                        <Stack direction='row' spacing={1} alignItems='center'>
                          <Icon icon='lucide:file-text' fontSize={15} />
                          <Typography component='span' variant='body2'>
                            {t('reservations.details.viewContract', { defaultValue: 'View Contract' })}
                          </Typography>
                        </Stack>
                      </Link>
                    )}
                    {invoiceHref && (
                      <Link href={invoiceHref} target='_blank' rel='noopener noreferrer' underline='hover'>
                        <Stack direction='row' spacing={1} alignItems='center'>
                          <Icon icon='lucide:receipt' fontSize={15} />
                          <Typography component='span' variant='body2'>
                            {t('reservations.details.viewInvoice', { defaultValue: 'View Invoice' })}
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

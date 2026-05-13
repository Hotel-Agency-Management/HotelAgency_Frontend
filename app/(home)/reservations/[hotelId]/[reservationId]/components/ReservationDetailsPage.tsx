'use client'

import { Button, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import Icon from '@/components/icon/Icon'
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
  const hotelId =  Number(params.hotelId)
  const reservationId = Number(params.reservationId)
  const { data: reservation, isLoading, isError } = useReservationById(hotelId, reservationId)
  const backHref = `/reservations/${params.hotelId ?? ''}/list`
  const contractHref = resolveBlobUrl(reservation?.contractUrl)
  const invoiceHref = resolveBlobUrl(reservation?.invoiceUrl)

  if (isLoading) {
    return (
      <Stack justifyContent="center">
        <Spinner />
      </Stack>
    )
  }

  if (isError || !reservation) {
    return (
      <Container maxWidth="md">
        <Stack spacing={2}>
          <Button
            startIcon={<Icon icon="lucide:arrow-left" />}
            onClick={() => router.push(backHref)}
            sx={{ alignSelf: 'flex-start' }}
          >
            Back to reservations
          </Button>
          <ErrorMessage message="Failed to load reservation details." />
        </Stack>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Button
          startIcon={<Icon icon="lucide:arrow-left" />}
          onClick={() => router.push(backHref)}
          sx={{ alignSelf: 'flex-start' }}
        >
          Back to reservations
        </Button>

        <BookingHeaderPaper variant="outlined">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={2}
          >
            <Stack spacing={0.5}>
              <Typography variant="caption" fontWeight={500}>
                Reservation Number
              </Typography>
              <Typography variant="h5" fontWeight={800}>
                {reservation.reservationNumber}
              </Typography>
              <Typography variant="body2">
                {reservation.hotelName}
              </Typography>
            </Stack>
            <BookingStatusChip status={reservation.status} />
          </Stack>
        </BookingHeaderPaper>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper icon="lucide:calendar-check" title="Stay Details">
              <InfoRow label="Hotel" value={reservation.hotelName} />
              <InfoRow label="Rooms" value={reservation.roomNumbers.join(', ')} />
              <InfoRow label="Check-In" value={reservation.checkInDate} />
              <InfoRow label="Check-Out" value={reservation.checkOutDate} />
              <InfoRow label="Guests" value={reservation.numberOfGuests} />
              <InfoRow label="Number of Rooms" value={reservation.numberOfRooms} />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper icon="lucide:user" title="Guest Details">
              <InfoRow label="Name" value={reservation.guestFullName} />
              <InfoRow label="Email" value={reservation.guestEmail} />
              <InfoRow label="Phone" value={reservation.guestPhone} />
              <InfoRow label="ID Number" value={reservation.guestIdNumber ?? '-'} />
              <InfoRow label="Customer ID" value={reservation.customerId} />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper icon="lucide:clipboard-list" title="Booking Info">
              <InfoRow label="Reservation ID" value={reservation.id} />
              <InfoRow label="Hotel ID" value={reservation.hotelId} />
              <InfoRow label="Source" value={reservation.source} />
              <InfoRow label="Special Requests" value={reservation.specialRequests} />
              <InfoRow label="Notes" value={reservation.notes} />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              <SectionPaper icon="lucide:badge-dollar-sign" title="Financial">
                <InfoRow label="Total Amount" value={reservation.totalAmount} emphasized />
                <InfoRow label="Has Insurance" value={reservation.hasInsurance ? 'Yes' : 'No'} />
                <InfoRow label="Insurance Amount" value={reservation.insuranceAmount} />
              </SectionPaper>

              {(contractHref || invoiceHref) && (
                <SectionPaper icon="lucide:file-text" title="Documents">
                  <Stack spacing={1.5}>
                    {contractHref && (
                      <Link href={contractHref} target="_blank" rel="noopener noreferrer" underline="hover">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Icon icon="lucide:file-text" fontSize={15} />
                          <Typography component="span" variant="body2">View Contract</Typography>
                        </Stack>
                      </Link>
                    )}
                    {invoiceHref && (
                      <Link href={invoiceHref} target="_blank" rel="noopener noreferrer" underline="hover">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Icon icon="lucide:receipt" fontSize={15} />
                          <Typography component="span" variant="body2">View Invoice</Typography>
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

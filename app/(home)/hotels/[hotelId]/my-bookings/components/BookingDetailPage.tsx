'use client'

import { Button, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import DirectionalIcon from '@/components/common/DirectionalIcon'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/loaders/Spinner'
import { resolveBlobUrl } from '@/core/constant/blobStorage'
import { EditReservationDialog } from '../../components/EditReservationDialog'
import { ExtendReservationDialog } from '../../components/ExtendReservationDialog'
import { CancelReservationDialog } from '../../components/CancelReservationDialog'
import { ReservationActionsMenu } from '../../components/ReservationActionsMenu'
import { useCustomerHotelRooms } from '../../hooks/useCustomerHotelRooms'
import { useMyBookingDetail } from '../hooks/useMyBookingDetail'
import { useBookingPricing } from '../hooks/useBookingPricing'
import { useBookingEdit } from '../hooks/useBookingEdit'
import { useBookingExtend } from '../hooks/useBookingExtend'
import { useBookingCancellation } from '../hooks/useBookingCancellation'
import { formatCurrency } from '../../utils/roomBooking'
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
  const roomsQuery = useCustomerHotelRooms(hotelId)
  const contractUrl = resolveBlobUrl(booking?.contractUrl)
  const invoiceUrl = resolveBlobUrl(booking?.invoiceUrl)
  const isConfirmed = booking?.status.toLowerCase() === 'confirmed'

  const pricing = useBookingPricing({ booking, rooms: roomsQuery.data ?? [] })
  const edit = useBookingEdit({
    booking,
    roomNumber: pricing.roomNumber,
    nightlyRate: pricing.nightlyRate,
    extendPrice: pricing.extendPrice,
  })
  const extend = useBookingExtend({ booking })
  const cancellation = useBookingCancellation({
    booking,
    hotelId,
    roomNumber: pricing.roomNumber,
    nightlyRate: pricing.nightlyRate,
    extendPrice: pricing.extendPrice,
    totalAmount: pricing.totalAmount,
  })

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
            startIcon={<DirectionalIcon icon="lucide:arrow-left" />}
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
          startIcon={<DirectionalIcon icon="lucide:arrow-left" />}
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
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ xs: 'stretch', sm: 'center' }}>
              <BookingStatusChip status={booking.status} />
              {isConfirmed ? (
                <ReservationActionsMenu
                  canModify
                  isBusy={edit.isUpdating || extend.isUpdating || cancellation.isCancelling}
                  onEdit={edit.openEdit}
                  onExtend={extend.openExtend}
                  onCancel={cancellation.openCancel}
                />
              ) : null}
            </Stack>
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
              <InfoRow label={t('myBookings.guestId')} value={booking.guestNumber} />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SectionPaper icon="lucide:clipboard-list" title={t('myBookings.bookingInfo')}>
              <InfoRow label={t('myBookings.specialRequests')} value={booking.specialRequests} />
              <InfoRow label={t('myBookings.notes')} value={booking.notes} />
            </SectionPaper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              <SectionPaper icon="lucide:badge-dollar-sign" title={t('myBookings.financial')}>
                <InfoRow
                  label={t('myBookings.taxAmount')}
                  value={booking.taxAmount?.toLocaleString() ?? '—'}
                  emphasized
                />
              </SectionPaper>

              {(contractUrl || invoiceUrl) && (
                <SectionPaper icon="lucide:file-text" title={t('myBookings.documents')}>
                  <Stack spacing={1.5}>
                    {contractUrl && (
                      <Link href={contractUrl} target="_blank" rel="noopener noreferrer" underline="hover">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Icon icon="lucide:file-text" fontSize={15} />
                          <Typography component="span" variant="body2">
                            {t('myBookings.downloadContract')}
                          </Typography>
                        </Stack>
                      </Link>
                    )}
                    {invoiceUrl && (
                      <Link href={invoiceUrl} target="_blank" rel="noopener noreferrer" underline="hover">
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

      <EditReservationDialog
        open={edit.editOpen}
        canModify={Boolean(isConfirmed)}
        roomCapacity={999}
        isBusy={edit.isUpdating}
        currency="USD"
        language="en"
        nightlyRate={pricing.nightlyRate}
        roomOptions={edit.roomOptions}
        editForm={edit.editForm}
        editFormHasValidRange={edit.editFormHasValidRange}
        editStayLength={edit.editStayLength}
        editConflict={null}
        showDirectReservationFields
        showReservationSourceField={false}
        canEditGuestFullName={false}
        onClose={edit.closeEdit}
        onSave={edit.saveEdit}
        onFieldChange={edit.onFieldChange}
      />

      <ExtendReservationDialog
        open={extend.extendOpen}
        currentCheckOut={booking.checkOutDate}
        extendPrice={pricing.extendPrice}
        language="en"
        currency="USD"
        extendCheckOut={extend.extendCheckOut}
        extendHasValidRange={extend.extendHasValidRange}
        extendConflict={null}
        isBusy={extend.isUpdating}
        onClose={extend.closeExtend}
        onConfirm={extend.saveExtend}
        onCheckOutChange={extend.onCheckOutChange}
      />

      <CancelReservationDialog
        open={cancellation.cancelOpen}
        freeCancellation={cancellation.freeCancellation}
        freeCancellationDeadlineLabel={cancellation.freeCancellationDeadlineLabel}
        reservationTotalLabel={formatCurrency(pricing.totalAmount, 'en', 'USD')}
        cancellationFeeRateLabel={cancellation.cancellationFeeRateLabel}
        cancellationFeeLabel={formatCurrency(cancellation.cancellationFee, 'en', 'USD')}
        refundAmountLabel={formatCurrency(cancellation.refundAmount, 'en', 'USD')}
        isBusy={cancellation.isCancelling}
        onClose={cancellation.closeCancel}
        onConfirm={cancellation.confirmCancel}
      />
    </Container>
  )
}

'use client'

import { Button, Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import type { ReservationListItem } from '../types'
import {
  BookingCardBody,
  BookingCardFooter,
  BookingCardHeader,
  BookingCardIconBox,
  BookingCardRoot,
} from '../styles/StyledComponents'
import { BookingStatusChip } from './BookingStatusChip'

interface BookingListCardProps {
  booking: ReservationListItem
  hotelId: string
}

export function BookingListCard({ booking, hotelId }: BookingListCardProps) {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <BookingCardRoot variant="outlined">
      <BookingCardHeader>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="subtitle2" fontWeight={700}>
            {booking.reservationNumber}
          </Typography>
          <BookingStatusChip status={booking.status} />
        </Stack>
      </BookingCardHeader>

      <BookingCardBody>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <BookingCardIconBox>
              <Icon icon="lucide:calendar" fontSize={15} />
            </BookingCardIconBox>
            <Stack spacing={0.25}>
              <Typography variant="caption" color="text.secondary">
                {t('myBookings.checkIn')} → {t('myBookings.checkOut')}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {booking.checkInDate} → {booking.checkOutDate}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <BookingCardIconBox>
              <Icon icon="lucide:bed-double" fontSize={15} />
            </BookingCardIconBox>
            <Stack spacing={0.25}>
              <Typography variant="caption" color="text.secondary">
                {t('myBookings.rooms')}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {booking.roomNumbers.join(', ')}
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {t('myBookings.totalAmount')}
            </Typography>
            <Typography variant="subtitle2" fontWeight={700} color="primary">
              {booking.totalAmount.toLocaleString()}
            </Typography>
          </Stack>
        </Stack>
      </BookingCardBody>

      <BookingCardFooter>
        <Button
          fullWidth
          variant="contained"
          size="small"
          endIcon={<Icon icon="lucide:arrow-right" fontSize={14} />}
          onClick={() => router.push(`/hotels/${hotelId}/my-bookings/${booking.id}`)}
        >
          {t('myBookings.viewDetails')}
        </Button>
      </BookingCardFooter>
    </BookingCardRoot>
  )
}

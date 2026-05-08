'use client'

import { Container, Grid, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Icon from '@/components/icon/Icon'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Spinner from '@/components/loaders/Spinner'
import { useMyBookingsView } from '../hooks/useMyBookingsView'
import {
  BookingsEmptyIconBox,
  BookingsEmptyState,
  BookingsLoadingBox,
} from '../styles/StyledComponents'
import { BookingListCard } from './BookingListCard'
import { MyBookingsToolbar } from './MyBookingsToolbar'

export function MyBookingsPage() {
  const params = useParams<{ hotelId?: string }>()
  const hotelId = params.hotelId ? decodeURIComponent(params.hotelId) : ''
  const { view, setView, bookings, isLoading, isError, columns } = useMyBookingsView(hotelId)
  const { t } = useTranslation()

  return (
    <Container maxWidth="xl">
      <Stack spacing={3}>
        <MyBookingsToolbar
          count={bookings.length}
          isLoading={isLoading}
          view={view}
          onViewChange={setView}
        />

        {isLoading && (
          <BookingsLoadingBox>
            <Spinner />
          </BookingsLoadingBox>
        )}

        {isError && <ErrorMessage message={t('myBookings.loadError')} />}

        {!isLoading && !isError && bookings.length === 0 && (
          <BookingsEmptyState spacing={2}>
            <BookingsEmptyIconBox>
              <Icon icon="lucide:calendar-x" fontSize={32} />
            </BookingsEmptyIconBox>
            <Typography variant="h6" fontWeight={600}>
              {t('myBookings.empty')}
            </Typography>
          </BookingsEmptyState>
        )}

        {!isLoading && !isError && bookings.length > 0 && (
          <>
            {view === 'cards' ? (
              <Grid container spacing={3}>
                {bookings.map(booking => (
                  <Grid key={booking.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                    <BookingListCard booking={booking} hotelId={hotelId} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <DataGrid
                rows={bookings}
                columns={columns}
                loading={isLoading}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                autoHeight
              />
            )}
          </>
        )}
      </Stack>
    </Container>
  )
}

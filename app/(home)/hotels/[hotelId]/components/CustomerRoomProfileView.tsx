'use client'

import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { DynamicBreadcrumbs } from '@/components/common/breadcrumbs/DynamicBreadcrumbs'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import { RoomAmenitiesList } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/RoomAmenitiesList'
import { RoomGallery } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/RoomGallery'
import { RoomNotesSection } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/RoomNotesSection'
import { RoomProfileHeader } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/RoomProfileHeader'
import { RoomProfileSkeleton } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/profileSkelton/RoomProfileSkeleton'
import { customerHotelBreadcrumbFactory } from '../../factories/customerHotelBreadcrumbFactory'
import { useCustomerRoomReservation } from '../hooks/useCustomerRoomReservation'
import { useCustomerRoomProfile } from '../hooks/useCustomerRoomProfile'
import { CustomerRoomBookingCard } from './CustomerRoomBookingCard'
import { CustomerReservationManagementSection } from './CustomerReservationManagementSection'

export function CustomerRoomProfileView() {
  const { t } = useTranslation()
  const params = useParams<{ hotelId: string; roomId: string }>()

  const hotelId = decodeURIComponent(params.hotelId ?? '')
  const roomId = decodeURIComponent(params.roomId ?? '')

  const { hotel, room, profile, isLoading, isError } = useCustomerRoomProfile(hotelId, roomId)
  const title = useMemo(
    () =>
      profile
        ? t('hotelRooms.profile.roomHeading', {
            number: profile.roomNumber,
            type: profile.roomTypeName ?? ROOM_TYPES[profile.type].label,
          })
        : '',
    [profile, t]
  )
  const { reservation, handleBack, handleReservationDateChange } = useCustomerRoomReservation({
    hotelId,
    roomId,
    hotelName: hotel?.name,
    roomNumber: profile?.roomNumber ?? '',
    currency: hotel?.currency,
  })

  if (isLoading && !profile) {
    return (
      <Container maxWidth="lg">
        <RoomProfileSkeleton onBack={handleBack} onEdit={handleBack} onDelete={handleBack} />
      </Container>
    )
  }

  if (isError || !profile) {
    return (
      <Container maxWidth="lg">
        <Paper variant="customerHotelRoomEmpty">
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4">{t('hotelRooms.profile.notFoundTitle')}</Typography>
            <Typography color="text.secondary">
              {t('hotelRooms.profile.notFoundDescription')}
            </Typography>
          </Stack>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg">
      <Stack gap={2.5} sx={{ width: 1, mx: 'auto' }}>
        <DynamicBreadcrumbs
          factory={customerHotelBreadcrumbFactory}
          context={{
            hotelId,
            hotelName: hotel?.name,
            roomLabel: room?.roomNumber,
          }}
          isLoading={isLoading}
        />

        <RoomProfileHeader title={title} status={profile.status} onBack={handleBack} loading={false} />

        <Grid container spacing={2.5} alignItems="stretch">
          <Grid size={{ xs: 12, lg: 8 }}>
            <RoomGallery photos={profile.photos} loading={false} />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }} sx={{ display: 'flex' }}>
            <CustomerRoomBookingCard
              hotelId={hotelId}
              roomId={roomId}
              hotel={hotel}
              room={profile}
              reservation={reservation}
              onReservationDateChange={handleReservationDateChange}
            />
          </Grid>

          <Grid size={12}>
            <RoomAmenitiesList amenities={profile.amenities} loading={false} />
          </Grid>

          <Grid size={12}>
            <RoomNotesSection description={profile.description} notes={profile.notes} loading={false} />
          </Grid>

          <Grid size={12}>
            <CustomerReservationManagementSection
              hotelId={hotelId}
              roomId={roomId}
              hotel={hotel}
              room={profile}
            />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}

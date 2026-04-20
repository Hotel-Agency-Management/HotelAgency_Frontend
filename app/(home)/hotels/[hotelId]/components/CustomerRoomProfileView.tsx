'use client'

import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { DynamicBreadcrumbs } from '@/components/common/breadcrumbs/DynamicBreadcrumbs'
import { ROOM_TYPES } from '@/app/(home)/room-types/constants/roomTypes'
import { RoomAmenitiesList } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/RoomAmenitiesList'
import { RoomGallery } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/RoomGallery'
import { RoomNotesSection } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/RoomNotesSection'
import { RoomProfileHeader } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/RoomProfileHeader'
import { RoomProfileSkeleton } from '@/app/(home)/agency/hotels/[hotelId]/rooms/components/profile/profileSkelton/RoomProfileSkeleton'
import { customerHotelBreadcrumbFactory } from '../../factories/customerHotelBreadcrumbFactory'
import { useCustomerRoomProfile } from '../hooks/useCustomerRoomProfile'
import { parsePositiveNumber } from '../utils/number'
import { CustomerRoomBookingCard } from './CustomerRoomBookingCard'

export function CustomerRoomProfileView() {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams<{ hotelId: string; roomId: string }>()

  const hotelId = decodeURIComponent(params.hotelId ?? '')
  const roomId = decodeURIComponent(params.roomId ?? '')

  const { hotel, room, profile, isLoading, isError } = useCustomerRoomProfile(hotelId, roomId)
  const reservationSearch = searchParams.toString()

  const handleBack = () => {
    router.push(reservationSearch ? `/hotels/${hotelId}?${reservationSearch}` : `/hotels/${hotelId}`)
  }

  const title = profile
    ? t('hotelRooms.profile.roomHeading', {
        number: profile.roomNumber,
        type: ROOM_TYPES[profile.type].label,
      })
    : ''

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

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <RoomGallery photos={profile.photos} loading={false} />
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <CustomerRoomBookingCard
              room={profile}
              reservation={{
                hotelName: hotel?.name ?? 'Selected hotel',
                roomNumber: profile.roomNumber,
                checkIn: searchParams.get('checkIn') ?? '',
                checkOut: searchParams.get('checkOut') ?? '',
                guests: parsePositiveNumber(searchParams.get('guests') ?? '', 1),
                rooms: parsePositiveNumber(searchParams.get('rooms') ?? '', 1),
                currency: hotel?.currency ?? 'USD',
              }}
            />
          </Grid>

          <Grid size={12}>
            <RoomAmenitiesList amenities={profile.amenities} loading={false} />
          </Grid>

          <Grid size={12}>
            <RoomNotesSection description={profile.description} notes={profile.notes} loading={false} />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}

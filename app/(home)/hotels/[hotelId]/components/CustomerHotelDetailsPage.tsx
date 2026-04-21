'use client'

import { Container, Stack } from '@mui/material'
import { useParams } from 'next/navigation'
import { DynamicBreadcrumbs } from '@/components/common/breadcrumbs/DynamicBreadcrumbs'
import { useCustomerHotelDetails } from '../hooks/useCustomerHotelDetails'
import { customerHotelBreadcrumbFactory } from '../../factories/customerHotelBreadcrumbFactory'
import { HotelDetailsHero } from './HotelDetailsHero'
import { HotelNotFoundState } from './HotelNotFoundState'
import { HotelRoomSearchPanel } from './HotelRoomSearchPanel'
import { HotelRoomsSection } from './HotelRoomsSection'

export function CustomerHotelDetailsPage() {
  const params = useParams<{ hotelId?: string }>()
  const hotelId = params.hotelId ? decodeURIComponent(params.hotelId) : ''
  const {
    hotel,
    rooms,
    filteredRooms,
    roomTypes,
    filters,
    updateFilters,
    resetFilters,
    isLoading,
    isRoomsLoading,
  } = useCustomerHotelDetails(hotelId)

  if (!isLoading && hotel == null) {
    return (
      <Container maxWidth="lg">
        <HotelNotFoundState />
      </Container>
    )
  }

  return (
    <Container maxWidth="xl">
      <Stack spacing={3.5}>
        <DynamicBreadcrumbs
          factory={customerHotelBreadcrumbFactory}
          context={{ hotelId, hotelName: hotel?.name }}
          isLoading={isLoading}
        />
        <HotelDetailsHero hotel={hotel} isLoading={isLoading} />
        <HotelRoomSearchPanel
          filters={filters}
          roomTypes={roomTypes}
          onChange={updateFilters}
        />
        <HotelRoomsSection
          rooms={filteredRooms}
          totalRooms={rooms.length}
          roomTypes={roomTypes}
          currency={hotel?.currency ?? 'USD'}
          filters={filters}
          isLoading={isRoomsLoading}
          onResetFilters={resetFilters}
        />
      </Stack>
    </Container>
  )
}

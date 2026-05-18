'use client'
import { useParams } from 'next/navigation'
import { useGetHotelById } from '../../hooks/queries/useHotelQueries'
import { useHotelFormActions } from '../../hooks/useHotelFormActions'
import { HotelFormPage } from '../../components/HotelFormPage'

export default function Page() {
  const { hotelId } = useParams<{ hotelId: string }>()
  const { data: hotel, isLoading: isLoadingDetail } = useGetHotelById(Number(hotelId))
  const { isLoading: isSubmitting, addHotel, updateHotel } = useHotelFormActions()
  return (
    <HotelFormPage
      mode="edit"
      hotelsPath="/agency/hotels"
      addHotel={addHotel}
      updateHotel={updateHotel}
      hotel={hotel}
      isLoading={isLoadingDetail || isSubmitting}
    />
  )
}

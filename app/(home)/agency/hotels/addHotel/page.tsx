'use client'
import { useHotelFormActions } from '../hooks/useHotelFormActions'
import { HotelFormPage } from '../components/HotelFormPage'

export default function Page() {
  const { isLoading, addHotel, updateHotel } = useHotelFormActions()
  return (
    <HotelFormPage
      mode="add"
      hotelsPath="/agency/hotels"
      addHotel={addHotel}
      updateHotel={updateHotel}
      isLoading={isLoading}
    />
  )
}

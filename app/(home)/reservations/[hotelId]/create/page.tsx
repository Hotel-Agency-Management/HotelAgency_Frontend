import DirectReservationCreatePage from '../components/create/DirectReservationCreatePage'

interface HotelDirectReservationCreateRouteProps {
  params: Promise<{ hotelId: string }>
}

export default async function HotelDirectReservationCreateRoute({
  params,
}: HotelDirectReservationCreateRouteProps) {
  const { hotelId } = await params

  return <DirectReservationCreatePage hotelId={Number(hotelId)} />
}

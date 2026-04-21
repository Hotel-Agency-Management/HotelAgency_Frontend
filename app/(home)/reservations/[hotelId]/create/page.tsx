import DirectReservationCreatePage from '../components/create/DirectReservationCreatePage'

interface HotelDirectReservationCreateRouteProps {
  searchParams: Promise<{
    totalAmount?: string
  }>
}

export default async function HotelDirectReservationCreateRoute({
  searchParams,
}: HotelDirectReservationCreateRouteProps) {
  const params = await searchParams
  const parsedTotalAmount = Number(params.totalAmount ?? 0)

  return (
    <DirectReservationCreatePage
      totalAmount={Number.isFinite(parsedTotalAmount) ? parsedTotalAmount : 0}
    />
  )
}

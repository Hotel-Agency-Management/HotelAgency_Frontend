import { ReservationDetailsPage } from './components/ReservationDetailsPage'

interface ReservationDetailsRouteProps {
  params: Promise<{
    hotelId: string
    reservationId: string
  }>
}

export default async function ReservationDetailsRoute({
  params: _params,
}: ReservationDetailsRouteProps) {
  return <ReservationDetailsPage />
}

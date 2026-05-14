import { ReservationListPage } from '../components/list/ReservationListPage'

interface ReservationListRouteProps {
  params: Promise<{ hotelId: string }>
}

export default async function ReservationListRoute({
  params: _params,
}: ReservationListRouteProps) {
  return <ReservationListPage />
}

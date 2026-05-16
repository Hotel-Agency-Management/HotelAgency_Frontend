import AdminReservationCreatePage from '../components/AdminReservationCreatePage'

interface AdminReservationCreateRouteProps {
  params: Promise<{ hotelId: string }>
}

export default async function AdminReservationCreateRoute({ params }: AdminReservationCreateRouteProps) {
  const { hotelId } = await params
  return <AdminReservationCreatePage hotelId={Number(hotelId)} />
}

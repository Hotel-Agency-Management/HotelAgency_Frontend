import AdminReservationCreatePage from '@/app/(home)/agency/hotels/[hotelId]/reservations/components/AdminReservationCreatePage'

interface SuperAdminReservationCreateRouteProps {
  params: Promise<{ hotelId: string }>
}

export default async function SuperAdminReservationCreateRoute({
  params,
}: SuperAdminReservationCreateRouteProps) {
  const { hotelId } = await params
  return <AdminReservationCreatePage hotelId={Number(hotelId)} />
}

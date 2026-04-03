import { RoomTypesView } from "./RoomTypesView"

interface PageProps {
  params: Promise<{ hotelId: string }>
}

export default async function RoomTypesPage({ params }: PageProps) {
  const { hotelId } = await params
  return <RoomTypesView hotelId={hotelId} />
}

import { PaymentLogsPage } from './components/PaymentLogsPage'

interface Props {
  params: Promise<{ hotelId: string }>
}

export default async function Page({ params }: Props) {
  const { hotelId } = await params
  return <PaymentLogsPage hotelId={hotelId} />
}

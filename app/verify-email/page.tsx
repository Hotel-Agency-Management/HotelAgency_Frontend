import VerifyEmailView from '@/components/auth/verifyEmail/VerifyEmailView'

interface VerifyEmailPageProps {
  searchParams: Promise<{
    userId?: string | string[]
    token?: string | string[]
  }>
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams
  const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId
  const token = Array.isArray(params.token) ? params.token[0] : params.token

  return <VerifyEmailView userId={userId} token={token} />
}

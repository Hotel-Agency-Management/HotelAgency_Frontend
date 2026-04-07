import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import { authConfig } from '@/core/configs/clientConfig'
import { createPostLoginRedirectStrategy } from '../../postLoginRedirect/factory'

interface Options {
  onIncompleteSignup: () => void
}

export const usePostLoginRedirect = ({ onIncompleteSignup }: Options) => {
  const { user } = useAuth()
  const router = useRouter()
  const handledRef = useRef(false)

  useEffect(() => {
    if (!user || handledRef.current || !user.freshLogin) return

    const redirectToHome = () => {
      router.push(authConfig.homePageURL)
    }

    const strategy = createPostLoginRedirectStrategy({
      role: user.role,
      agencyStatus: user.agencyStatus,
      onIncompleteSignup,
      redirectToHome,
    })

    handledRef.current = true
    strategy.execute()
  }, [user, router, onIncompleteSignup])
}

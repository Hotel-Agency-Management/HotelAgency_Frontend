import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/core/context/AuthContext'
import { authConfig } from '@/core/configs/clientConfig'

interface Options {
  onIncompleteSignup: () => void
}

export const usePostLoginRedirect = ({ onIncompleteSignup }: Options) => {
  const { user } = useAuth()
  const router = useRouter()
  const handledRef = useRef(false)

  useEffect(() => {
    if (!user || handledRef.current || !user.freshLogin) return

    handledRef.current = true

    const key = `${user.role}:${user.agencyStatus ?? 'none'}`

    const actions: Record<string, () => void> = {
      'agencyOwner:incomplete': onIncompleteSignup,
      default: () => router.push(authConfig.homePageURL)
    }

    ;(actions[key] || actions.default)()
  }, [user, router, onIncompleteSignup])
}

import { authConfig } from "@/core/configs/clientConfig"
import { useAuth } from "@/core/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Props {
  onIncompleteSignup: () => void
}

export default function PostLoginRedirect({ onIncompleteSignup }: Props) {
  const { user } = useAuth()
  const router = useRouter()

    useEffect(() => {
      if (!user) return
      if (!user.freshLogin) return

      if (user.role === 'agencyOwner' && user.agencyStatus === 'incomplete') {
        onIncompleteSignup()
      } else {
        router.push(authConfig.homePageURL)
      }
    }, [user])

  return null
}

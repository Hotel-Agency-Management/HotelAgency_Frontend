'use client'

import Spinner from '@/components/loaders/Spinner'
import { useAuth } from '@/core/context/AuthContext'
import { getHomePageComponent } from './factories/homePageFactory'

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Spinner />
  }

  const HomePageComponent = getHomePageComponent(user?.role)

  return <HomePageComponent />
}

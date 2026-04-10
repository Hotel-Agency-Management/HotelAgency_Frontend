import { fetchDynamicRoutes } from '@/navigation/dynamicRoutes'
import HomeSidebarShell from './HomeSidebarShell'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  let dynamicNavItems: Awaited<ReturnType<typeof fetchDynamicRoutes>> = []
  try {
    dynamicNavItems = await fetchDynamicRoutes()
  } catch (error) {
    console.error('Failed to fetch dynamic nav routes:', error)
  }

  return (
    <HomeSidebarShell dynamicNavItems={dynamicNavItems}>
      {children}
    </HomeSidebarShell>
  )
}

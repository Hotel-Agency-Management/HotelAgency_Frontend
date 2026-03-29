import type { SidebarNavItems } from '@/core/layouts/types'

const navigation = (): SidebarNavItems => [
  {
    sectionTitle: 'Administration',
    icon: 'lucide:user-plus',
    tooltip: 'Invite a new user',
    subject: 'Home',
    action: 'read',
    items: [
      {
        title: 'Dashboard',
        path: '/home',
        icon: 'lucide:layout-dashboard',
        subject: 'Home',
        action: 'read'
      }
    ]
  }
]

export default navigation

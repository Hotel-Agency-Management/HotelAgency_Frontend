import type { SidebarNavItems } from '@/core/layouts/types'

const navigation = (agencyName?: string): SidebarNavItems => [
  {
    sectionTitle: 'Agency',
    icon: 'lucide:building-2',
    subject: 'Agency',
    action: 'manage',
    items: [
      {
        title: 'Agency Settings',
        path: `/agency/${agencyName}/settings`,
        icon: 'lucide:settings',
        subject: 'Agency',
        action: 'manage'
      },
      {
        title: 'Hotels',
        path: `/agency/${agencyName}/hotels`,
        icon: 'lucide:hotel',
        subject: 'Hotels',
        action: 'manage'
      },
      {
        title: 'User Management',
        path: `/agency/${agencyName}/users`,
        icon: 'lucide:users',
        subject: 'Users',
        action: 'manage'
      }
    ]
  }
]

export default navigation

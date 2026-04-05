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

      }
    ]
  }
]

export default navigation

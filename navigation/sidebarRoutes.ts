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
      },
      {
        title: 'Agency Approvals',
        path: '/agencyApproval',
        icon: 'lucide:clipboard-check',
        subject: 'Home',
        action: 'read'
      },
      {
        title: 'Subscription Plans',
        path: '/subscriptionPlans',
        icon: 'lucide:clipboard-list',
        subject: 'Home',
        action: 'read'
      }
    ]
  }
]

export default navigation

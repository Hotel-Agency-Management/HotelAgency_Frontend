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
        path: '/agency-approval',
        icon: 'lucide:clipboard-check',
        subject: 'Home',
        action: 'read'
      },
      {
        title: 'Subscription Plans',
        path: '/subscription-plans',
        icon: 'lucide:clipboard-list',
        subject: 'Home',
        action: 'read'
      },
      {
        title: 'Support & Tickets',
        path: '/supportTickets',
        icon: 'lucide:alert-circle',
        subject: 'Support',
        action: 'read'
      }
    ]
  }
]

export default navigation

import type { SidebarNavItems } from '@/core/layouts/types'

const navigation = (agencyName?: string): SidebarNavItems => [
  {
    sectionTitle: 'Administration',
    icon: 'lucide:shield-check',
    subject: 'SuperAdmin',
    action: 'manage',
    items: [
      {
        title: 'Admin Dashboard',
        path: '/admin-dashboard',
        icon: 'lucide:layout-dashboard',
        subject: 'Dashboard',
        action: 'read'
      },
      {
      title: 'Agency Approval',
      path: 'agency-approval',
      icon: 'lucide:check-circle',
      subject: 'AgencyApproval',
      action: 'manage'
      },
      {
        title: 'Subscription Plans',
        path: 'subscription-plans',
        icon: 'lucide:credit-card',
        subject: 'SubscriptionPlans',
        action: 'manage'
      },
      {
        title: 'Supports Tickets',
        path: 'support-tickets',
        icon: 'lucide:help-circle',
        subject: 'Tickets',
        action: 'manage'
      }
    ]
  },
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
        subject: 'AgencySettings',
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

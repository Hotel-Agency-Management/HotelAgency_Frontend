import type { SidebarNavItems } from '@/core/layouts/types'

const navigation = (agencyName?: string): SidebarNavItems => [
  {
    sectionTitle: 'Adminstartion',
    icon: 'lucide:shield',
    subject: 'Administration',
    action: 'manage',
    items: [
      {
        title: 'Admin Dashboard',
        path: '/admin-dashboard',
        icon: 'lucide:home',
        subject: 'Dashboard',
        action: 'manage'
      },
      {
        title: 'Agency Approval',
        path: '/agency-approval',
        icon: 'lucide:user-check',
        subject: 'AgencyApproval',
        action: 'manage'
      },
      {
        title: 'Subscription Plans',
        path: '/subscription-plans',
        icon: 'lucide:tag',
        subject: 'SubscriptionPlans',
        action: 'manage'
      },
      {
        title: 'Support Tickets',
        path: '/support-tickets',
        icon: 'lucide:life-buoy',
        subject: 'SupportTickets',
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
        title: 'Agencies',
        path: '/agencies',
        icon: 'lucide:building-2',
        subject: 'Agencies',
        action: 'manage'
      }
    ]
  }
]

export default navigation

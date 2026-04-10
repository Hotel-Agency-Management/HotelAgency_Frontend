import type { SidebarNavItems } from '@/core/layouts/types'

const navigation = (agencyName?: string, hotelId?: string): SidebarNavItems => {
  const items: SidebarNavItems = [
    {
      sectionTitle: 'General',
      icon: 'lucide:home',
      items: [
        {
          title: 'Dashboard',
          path: '/dashboard',
          icon: 'lucide:layout-dashboard',
          subject: 'Dashboard',
          action: 'read'
        },
        {
          title: 'Users',
          path: `/agency/${agencyName}/users`,
          icon: 'lucide:user',
          subject: 'Users',
          action: 'manage'
        }
      ]
    },
    {
      sectionTitle: 'Administration',
      icon: 'lucide:shield-check',
      subject: 'SuperAdmin',
      action: 'manage',
      items: [
        {
          title: 'Agency Approval',
          path: '/agency-approval',
          icon: 'lucide:check-circle',
          subject: 'AgencyApproval',
          action: 'manage'
        },
        {
          title: 'Subscription Plans',
          path: '/subscription-plans',
          icon: 'lucide:credit-card',
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
          title: 'Agency Settings',
          path: `/agency/${agencyName}/settings`,
          icon: 'lucide:settings'
        },
        {
          title: 'Agencies',
          path: '/agencies',
          icon: 'lucide:building-2'
        }
      ]
    },
    {
      sectionTitle: 'Hotels',
      icon: 'lucide:hotel',
      subject: 'Hotels',
      action: 'manage',
      items: [
        {
          title: 'Hotels',
          path: `/agency/${agencyName}/hotels`,
          icon: 'lucide:hotel',
          subject: 'Hotels',
          action: 'manage'
        }
      ]
    }
  ]

  if (!hotelId) {
    return items
  }

  return [
    ...items,
    {
      sectionTitle: 'Hotel Management',
      icon: 'lucide:building',
      subject: 'HotelManagement',
      action: 'manage',
      items: [
        {
          title: 'Hotel Settings',
          path: `/agency/${agencyName}/hotels/${hotelId}/settings`,
          icon: 'lucide:settings-2',
          subject: 'HotelSettings',
          action: 'manage'
        },
        {
          title: 'Rooms',
          path: `/agency/${agencyName}/hotels/${hotelId}/rooms`,
          icon: 'lucide:bed-double',
          subject: 'Rooms',
          action: 'manage'
        }
      ]
    },

    {
      sectionTitle: 'Housekeeping',
      icon: 'lucide:sparkles',
      subject: 'Housekeeping',
      action: 'manage',
      items: [
        {
          title: 'Dashboard',
          path: `/agency/${agencyName}/hotels/${hotelId}/housekeeping`,
          icon: 'lucide:layout-dashboard',
          subject: 'Housekeeping',
          action: 'manage'
        },
        {
          title: 'Task Management',
          path: `/agency/${agencyName}/hotels/${hotelId}/housekeeping/tasks`,
          icon: 'lucide:clipboard-check',
          subject: 'HousekeepingTasks',
          action: 'manage'
        },
        {
          title: 'Staff Management',
          path: `/agency/${agencyName}/hotels/${hotelId}/housekeeping/staff`,
          icon: 'lucide:users',
          subject: 'HousekeepingStaff',
          action: 'manage'
        }
      ]
    },

    {
      sectionTitle: 'Operations',
      icon: 'lucide:briefcase',
      subject: 'Operations',
      action: 'manage',
      items: [
        {
          title: 'Maintenance',
          path: `/agency/${agencyName}/hotels/${hotelId}/maintenance`,
          icon: 'lucide:wrench',
          subject: 'Maintenance',
          action: 'manage'
        },
        {
          title: 'Insurance',
          path: `/agency/${agencyName}/hotels/${hotelId}/insurance`,
          icon: 'lucide:shield',
          subject: 'Insurance',
          action: 'manage'
        }
      ]
    },

    {
      sectionTitle: 'Finance',
      icon: 'lucide:wallet',
      subject: 'Finance',
      action: 'manage',
      items: [
        {
          title: 'Financial Management',
          path: `/agency/${agencyName}/hotels/${hotelId}/finance`,
          icon: 'lucide:badge-dollar-sign',
          subject: 'Finance',
          action: 'manage'
        }
      ]
    },

    {
      sectionTitle: 'Bookings',
      icon: 'lucide:book-open-check',
      subject: 'Bookings',
      action: 'manage',
      items: [
        {
          title: 'Booking Overview',
          path: `/agency/${agencyName}/hotels/${hotelId}/bookings`,
          icon: 'lucide:clipboard-list',
          subject: 'Bookings',
          action: 'manage'
        }
      ]
    }
  ]
}

export default navigation

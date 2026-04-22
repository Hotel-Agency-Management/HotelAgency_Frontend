import type { SidebarNavItems } from '@/core/layouts/types'
import { AGENCY_TERMS_ROUTE } from '@/app/(home)/agency/hotels/terms-and-conditions/utils/routes'

const navigation = (hotelId?: string): SidebarNavItems => {
  const items: SidebarNavItems = [
    {
      sectionTitle: 'General',
      icon: 'lucide:home',
      items: [
        {
          title: 'Explore Hotels',
          path: '/hotels',
          icon: 'lucide:map',
          subject: 'AllHotels',
          action: 'read'
        },
        {
          title: 'Dashboard',
          path: '/dashboard',
          icon: 'lucide:layout-dashboard',
          subject: 'Dashboard',
          action: 'read'
        },
        {
          title: 'Users',
          path: '/agency/users',
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
          path: '/agency/settings',
          icon: 'lucide:settings',
          subject: 'AgencySettings',
          action: 'manage'
        },
        {
          title: 'Agencies',
          path: '/agencies',
          icon: 'lucide:building-2',
          subject: 'Agencies',
          action : 'manage'
        }
      ]
    },
    {
      sectionTitle: 'Hotels',
      icon: 'lucide:hotel',
      subject: 'Hotels',
      action: 'read',
      items: [
        {
          title: 'Hotels',
          path: '/agency/hotels',
          icon: 'lucide:hotel',
          subject: 'Hotels',
          action: 'manage'
        },
        {
          title: 'Terms & Conditions',
          path: AGENCY_TERMS_ROUTE,
          icon: 'lucide:file-text',
          subject: 'Hotels',
          action: 'manage'
        },
      ]
    },
    {
      sectionTitle: 'Rooms',
      icon: 'lucide:hotel',
      subject: 'Rooms',
      action: 'manage',
      items: [
        {
          title: 'Room Types',
          path: '/room-types',
          icon: 'lucide:bed-single',
          subject: 'RoomTypes',
          action: 'manage'
        },
        {
          title: 'Rooms Amenities',
          path: '/room-amenities',
          icon: 'lucide:bed-double',
          subject: 'RoomAmenities',
          action: 'manage'
        },
      ]
    },
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
          path: `/agency/hotels/${hotelId}/settings`,
          icon: 'lucide:settings-2',
          subject: 'HotelSettings',
          action: 'manage'
        },
        {
          title: 'Terms & Conditions',
          path: `/agency/hotels/${hotelId}/settings/terms-and-conditions`,
          icon: 'lucide:file-text',
          subject: 'HotelSettings',
          action: 'manage'
        },
        {
          title: 'Rooms',
          path: `/agency/hotels/${hotelId}/rooms`,
          icon: 'lucide:bed-double',
          subject: 'Rooms',
          action: 'manage'
        },
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
          path: `/agency/hotels/${hotelId}/housekeeping`,
          icon: 'lucide:layout-dashboard',
          subject: 'Housekeeping',
          action: 'manage'
        },
        {
          title: 'Task Management',
          path: `/agency/hotels/${hotelId}/housekeeping/tasks`,
          icon: 'lucide:clipboard-check',
          subject: 'HousekeepingTasks',
          action: 'manage'
        },
        {
          title: 'Issues & Alerts',
          path: `/agency/hotels/${hotelId}/housekeeping/issues-alerts`,
          icon: 'lucide:alert-triangle',
          subject: 'Housekeeping',
          action: 'manage'
        },
        {
          title: 'Staff Management',
          path: `/agency/hotels/${hotelId}/housekeeping/staff`,
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
          path: `/agency/hotels/${hotelId}/maintenance`,
          icon: 'lucide:wrench',
          subject: 'Maintenance',
          action: 'manage'
        },
        {
          title: 'Insurance',
          path: `/agency/hotels/${hotelId}/insurance`,
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
          path: `/agency/hotels/${hotelId}/finance`,
          icon: 'lucide:badge-dollar-sign',
          subject: 'Finance',
          action: 'manage'
        }
      ]
    },

    {
      sectionTitle: 'Bookings',
      icon: 'lucide:book-open-check',
      items: [
        {
          title: 'Booking Overview',
          path: `/agency/hotels/${hotelId}/bookings`,
          icon: 'lucide:clipboard-list',
          subject: 'Bookings',
          action: 'manage'
        },
        {
          title: 'Create Reservation',
          path: `/reservations/${hotelId}/create`,
          icon: 'lucide:clipboard-plus',
          subject: 'Reservations',
          action: 'create'
        }
      ]
    }
  ]
}

export default navigation

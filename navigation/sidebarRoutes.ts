import type { SidebarNavItems } from '@/core/layouts/types'
import { AGENCY_TERMS_ROUTE } from '@/app/(home)/agency/hotels/terms-and-conditions/utils/routes'

const navigation = (hotelId?: string, agencyId?: string): SidebarNavItems => {
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
          path: '/users',
          icon: 'lucide:user',
          subject: 'Users',
          action: 'manage'
        },
        {
          title: 'Explore Hotels',
          path: '/hotels',
          icon: 'lucide:map',
          subject: 'AllHotels',
          action: 'read'
        },
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
      sectionTitle: 'Finance',
      icon: 'lucide:wallet',
      subject: 'PaymentLogs',
      action: 'manage',
      items: [
        {
          title: 'Payment Logs',
          path: '/payment-logs',
          icon: 'lucide:receipt-text',
          subject: 'PaymentLogs',
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
      subject: 'AgencySettings',
      action: 'manage',
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
          title: 'Rooms Amenities',
          path: '/room-amenities',
          icon: 'lucide:bed-double',
          subject: 'RoomAmenities',
          action: 'manage'
        },
        {
          title: 'Room Types',
          path: '/room-types',
          icon: 'lucide:bed-single',
          subject: 'RoomTypes',
          action: 'manage'
        },
      ]
    },
  ]

  if (!hotelId) {
    return items
  }

  const hotelBasePath = agencyId
    ? `/agencies/${agencyId}/hotels/${hotelId}`
    : `/agency/hotels/${hotelId}`
  const adminReservationsBasePath = agencyId
    ? `/agencies/${agencyId}/hotels/${hotelId}/reservations`
    : `/agency/hotels/${hotelId}/reservations`

  const hotelManagementSection: SidebarNavItems[number] = {
    sectionTitle: 'Hotel Management',
    icon: 'lucide:building',
    subject: 'HotelManagement',
    action: 'manage',
    items: [
      {
        title: 'Hotel Settings',
        path: `${hotelBasePath}/settings`,
        icon: 'lucide:settings-2',
        subject: 'HotelSettings',
        action: 'manage'
      },
      {
        title: 'Rooms',
        path: `${hotelBasePath}/rooms`,
        icon: 'lucide:bed-double',
        subject: 'Rooms',
        action: 'manage'
      },
      {
        title: 'Facilities',
        path: `${hotelBasePath}/facilities`,
        icon: 'lucide:badge-check',
        subject: 'Agencies',
        action: 'manage'
      },
    ]
  }

  if (agencyId) {
    return [
      ...items,
      hotelManagementSection,
      {
        sectionTitle: 'Bookings',
        icon: 'lucide:book-open-check',
        subject: 'AdminReservations',
        action: 'manage',
        items: [
          {
            title: 'All Reservations',
            path: `${adminReservationsBasePath}/list`,
            icon: 'lucide:calendar-range',
            subject: 'AdminReservations',
            action: 'manage'
          },
          {
            title: 'Create Reservation',
            path: `${adminReservationsBasePath}/create`,
            icon: 'lucide:clipboard-plus',
            subject: 'AdminReservations',
            action: 'manage'
          }
        ]
      },
    ]
  }

  return [
    ...items,
    hotelManagementSection,

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
      sectionTitle: 'Finance',
      icon: 'lucide:wallet',
      subject: 'PaymentLogs',
      action: 'read',
      items: [
        {
          title: 'Payment Logs',
          path: `/agency/hotels/${hotelId}/payment-logs`,
          icon: 'lucide:receipt-text',
          subject: 'PaymentLogs',
          action: 'read'
        }
      ]
    },

    {
      sectionTitle: 'Reservations',
      icon: 'lucide:book-open-check',
      subject: 'Reservations',
      action: 'manage',
      items: [
        {
          title: 'Reservations',
          path: `/reservations/${hotelId}/list`,
          icon: 'lucide:calendar-range',
          subject: 'Reservations',
          action: 'read'
        },
        {
          title: 'Create Reservation',
          path: `/reservations/${hotelId}/create`,
          icon: 'lucide:clipboard-plus',
          subject: 'Reservations',
          action: 'create'
        },
        {
          title: 'Admin Reservations',
          path: `${adminReservationsBasePath}/list`,
          icon: 'lucide:calendar-range',
          subject: 'AdminReservations',
          action: 'manage'
        },
        {
          title: 'Create Admin Reservation',
          path: `${adminReservationsBasePath}/create`,
          icon: 'lucide:clipboard-plus',
          subject: 'AdminReservations',
          action: 'manage'
        }
      ]
    },

    {
      sectionTitle: 'Damage Reports',
      icon: 'lucide:alert-triangle',
      subject: 'DamageReports',
      action: 'read',
      items: [
        {
          title: 'Damage Reports',
          path: `/agency/hotels/${hotelId}/damage-reports`,
          icon: 'lucide:alert-triangle',
          subject: 'DamageReports',
          action: 'read'
        }
      ]
    }
  ]
}

export default navigation

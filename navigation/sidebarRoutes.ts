import type { TFunction } from 'i18next'
import type { SidebarNavItems } from '@/core/layouts/types'
import { AGENCY_TERMS_ROUTE } from '@/app/(home)/agency/hotels/terms-and-conditions/utils/routes'

const navigation = (hotelId?: string, agencyId?: string, t?: TFunction): SidebarNavItems => {
  const T = (key: string, defaultValue: string) =>
    t ? t(key, { defaultValue }) : defaultValue

  const items: SidebarNavItems = [
    {
      sectionTitle: T('nav.sections.general', 'General'),
      icon: 'lucide:home',
      items: [
        {
          title: T('nav.items.dashboard', 'Dashboard'),
          path: '/dashboard',
          icon: 'lucide:layout-dashboard',
          subject: 'Dashboard',
          action: 'read'
        },
        {
          title: T('nav.items.users', 'Users'),
          path: '/users',
          icon: 'lucide:user',
          subject: 'Users',
          action: 'manage'
        },
        {
          title: T('nav.items.exploreHotels', 'Explore Hotels'),
          path: '/hotels',
          icon: 'lucide:map',
          subject: 'AllHotels',
          action: 'read'
        },
      ]
    },
    {
      sectionTitle: T('nav.sections.administration', 'Administration'),
      icon: 'lucide:shield-check',
      subject: 'SuperAdmin',
      action: 'manage',
      items: [
        {
          title: T('nav.items.agencyApproval', 'Agency Approval'),
          path: '/agency-approval',
          icon: 'lucide:check-circle',
          subject: 'AgencyApproval',
          action: 'manage'
        },
        {
          title: T('nav.items.subscriptionPlans', 'Subscription Plans'),
          path: '/subscription-plans',
          icon: 'lucide:credit-card',
          subject: 'SubscriptionPlans',
          action: 'manage'
        },
        {
          title: T('nav.items.supportTickets', 'Support Tickets'),
          path: '/support-tickets',
          icon: 'lucide:life-buoy',
          subject: 'SupportTickets',
          action: 'manage'
        }
      ]
    },
    {
      sectionTitle: T('nav.sections.finance', 'Finance'),
      icon: 'lucide:wallet',
      subject: 'AllPaymentLogs',
      action: 'manage',
      items: [
        {
          title: T('nav.items.paymentLogs', 'Payment Logs'),
          path: '/payment-logs',
          icon: 'lucide:receipt-text',
          subject: 'AllPaymentLogs',
          action: 'manage'
        }
      ]
    },
    {
      sectionTitle: T('nav.sections.systemLogs', 'Activity Log'),
      icon: 'lucide:history',
      subject: 'SystemLogs',
      action: 'read',
      items: [
        {
          title: T('nav.items.systemLogs', 'System Logs'),
          path: '/system-logs',
          icon: 'lucide:scroll-text',
          subject: 'SystemLogs',
          action: 'read'
        }
      ]
    },
    {
      sectionTitle: T('nav.sections.agency', 'Agency'),
      icon: 'lucide:building-2',
      subject: 'Agency',
      action: 'manage',
      items: [
        {
          title: T('nav.items.agencySettings', 'Agency Settings'),
          path: '/agency/settings',
          icon: 'lucide:settings',
          subject: 'AgencySettings',
          action: 'manage'
        },
        {
          title: T('nav.items.agencies', 'Agencies'),
          path: '/agencies',
          icon: 'lucide:building-2',
          subject: 'Agencies',
          action : 'manage'
        }
      ]
    },
    {
      sectionTitle: T('nav.sections.hotels', 'Hotels'),
      icon: 'lucide:hotel',
      subject: 'AgencySettings',
      action: 'manage',
      items: [
        {
          title: T('nav.items.hotels', 'Hotels'),
          path: '/agency/hotels',
          icon: 'lucide:hotel',
          subject: 'Hotels',
          action: 'manage'
        },
        {
          title: T('nav.items.termsAndConditions', 'Terms & Conditions'),
          path: AGENCY_TERMS_ROUTE,
          icon: 'lucide:file-text',
          subject: 'Hotels',
          action: 'manage'
        },
      ]
    },
    {
      sectionTitle: T('nav.sections.rooms', 'Rooms'),
      icon: 'lucide:hotel',
      subject: 'Rooms',
      action: 'manage',
      items: [
        {
          title: T('nav.items.roomsAmenities', 'Rooms Amenities'),
          path: '/room-amenities',
          icon: 'lucide:bed-double',
          subject: 'RoomAmenities',
          action: 'manage'
        },
        {
          title: T('nav.items.roomTypes', 'Room Types'),
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
    sectionTitle: T('nav.sections.hotelManagement', 'Hotel Management'),
    icon: 'lucide:building',
    subject: 'HotelManagement',
    action: 'manage',
    items: [
      {
        title: T('nav.items.hotelSettings', 'Hotel Settings'),
        path: `${hotelBasePath}/settings`,
        icon: 'lucide:settings-2',
        subject: 'HotelSettings',
        action: 'manage'
      },
      {
        title: T('nav.items.rooms', 'Rooms'),
        path: `${hotelBasePath}/rooms`,
        icon: 'lucide:bed-double',
        subject: 'Rooms',
        action: 'manage'
      },
      {
        title: T('nav.items.facilities', 'Facilities'),
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
        sectionTitle: T('nav.sections.housekeeping', 'Housekeeping'),
        icon: 'lucide:sparkles',
        subject: 'Housekeeping',
        action: 'manage',
        items: [
          {
            title: T('nav.items.dashboard', 'Dashboard'),
            path: `${hotelBasePath}/housekeeping`,
            icon: 'lucide:layout-dashboard',
            subject: 'Housekeeping',
            action: 'manage'
          },
          {
            title: T('nav.items.ticketManagement', 'Ticket Management'),
            path: `${hotelBasePath}/housekeeping/tickets`,
            icon: 'lucide:clipboard-check',
            subject: 'HousekeepingTickets',
            action: 'manage'
          },
          {
            title: T('nav.items.issuesAndAlerts', 'Issues & Alerts'),
            path: `${hotelBasePath}/housekeeping/issues-alerts`,
            icon: 'lucide:alert-triangle',
            subject: 'Housekeeping',
            action: 'manage'
          },
        ]
      },
      {
        sectionTitle: T('nav.sections.bookings', 'Bookings'),
        icon: 'lucide:book-open-check',
        subject: 'AdminReservations',
        action: 'manage',
        items: [
          {
            title: T('nav.items.adminReservations', 'Admin Reservations'),
            path: `${adminReservationsBasePath}/list`,
            icon: 'lucide:calendar-range',
            subject: 'AdminReservations',
            action: 'manage'
          },
          {
            title: T('nav.items.createAdminReservation', 'Create Admin Reservation'),
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
      sectionTitle: T('nav.sections.housekeeping', 'Housekeeping'),
      icon: 'lucide:sparkles',
      subject: 'Housekeeping',
      action: 'manage',
      items: [
        {
          title: T('nav.items.dashboard', 'Dashboard'),
          path: `/agency/hotels/${hotelId}/housekeeping`,
          icon: 'lucide:layout-dashboard',
          subject: 'Housekeeping',
          action: 'manage'
        },
        {
          title: T('nav.items.ticketManagement', 'Ticket Management'),
          path: `/agency/hotels/${hotelId}/housekeeping/tickets`,
          icon: 'lucide:clipboard-check',
          subject: 'HousekeepingTickets',
          action: 'manage'
        },
        {
          title: T('nav.items.issuesAndAlerts', 'Issues & Alerts'),
          path: `/agency/hotels/${hotelId}/housekeeping/issues-alerts`,
          icon: 'lucide:alert-triangle',
          subject: 'Housekeeping',
          action: 'manage'
        },
        {
          title: T('nav.items.staffManagement', 'Staff Management'),
          path: `/agency/hotels/${hotelId}/housekeeping/staff`,
          icon: 'lucide:users',
          subject: 'HousekeepingStaff',
          action: 'manage'
        }
      ]
    },
    {
      sectionTitle: T('nav.sections.finance', 'Finance'),
      icon: 'lucide:wallet',
      subject: 'PaymentLogs',
      action: 'read',
      items: [
        {
          title: T('nav.items.paymentLogs', 'Payment Logs'),
          path: `/agency/hotels/${hotelId}/payment-logs`,
          icon: 'lucide:receipt-text',
          subject: 'PaymentLogs',
          action: 'read'
        }
      ]
    },

    {
      sectionTitle: T('nav.sections.reservations', 'Reservations'),
      icon: 'lucide:book-open-check',
      subject: 'Reservations',
      action: 'manage',
      items: [
        {
          title: T('nav.items.reservations', 'Reservations'),
          path: `/reservations/${hotelId}/list`,
          icon: 'lucide:calendar-range',
          subject: 'Reservations',
          action: 'read'
        },
        {
          title: T('nav.items.createReservation', 'Create Reservation'),
          path: `/reservations/${hotelId}/create`,
          icon: 'lucide:clipboard-plus',
          subject: 'Reservations',
          action: 'create'
        },
        {
          title: T('nav.items.adminReservations', 'Admin Reservations'),
          path: `${adminReservationsBasePath}/list`,
          icon: 'lucide:calendar-range',
          subject: 'AdminReservations',
          action: 'manage'
        },
        {
          title: T('nav.items.createAdminReservation', 'Create Admin Reservation'),
          path: `${adminReservationsBasePath}/create`,
          icon: 'lucide:clipboard-plus',
          subject: 'AdminReservations',
          action: 'manage'
        }
      ]
    },

    {
      sectionTitle: T('nav.sections.damageReports', 'Damage Reports'),
      icon: 'lucide:alert-triangle',
      subject: 'DamageReports',
      action: 'read',
      items: [
        {
          title: T('nav.items.damageReports', 'Damage Reports'),
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

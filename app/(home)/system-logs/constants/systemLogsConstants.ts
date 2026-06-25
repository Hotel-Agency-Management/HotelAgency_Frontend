import type { SystemLogsFilters } from '../types/systemLog'

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const

export const DEFAULT_PAGE_SIZE = 10

export const DEFAULT_FILTERS: SystemLogsFilters = {
  search: '',
  action: '',
  entityType: '',
  actorId: '',
  from: null,
  to: null
}

export const ACTION_OPTIONS = [
  'PLAN_DELETED',
  'ROOM_DELETED',
  'ROOM_TYPE_DELETED',
  'ROOM_PHOTO_DELETED',
  'ROOM_AMENITY_DELETED',
  'FACILITY_DELETED',
  'FACILITY_PHOTO_DELETED',
  'TICKET_DELETED',
  'TICKET_COMMENT_DELETED',
  'PAYMENT_LOG_DELETED'
]

export const ENTITY_TYPE_OPTIONS = [
  'Plan',
  'Room',
  'RoomType',
  'RoomPhoto',
  'RoomAmenity',
  'Facility',
  'FacilityPhoto',
  'Ticket',
  'TicketComment',
  'PaymentLog'
]

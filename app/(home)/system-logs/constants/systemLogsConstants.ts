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

export const ACTION_LABEL_FALLBACK: Record<string, string> = {
  PLAN_DELETED: 'Plan Deleted',
  ROOM_DELETED: 'Room Deleted',
  ROOM_TYPE_DELETED: 'Room Type Deleted',
  ROOM_PHOTO_DELETED: 'Room Photo Deleted',
  ROOM_AMENITY_DELETED: 'Room Amenity Deleted',
  FACILITY_DELETED: 'Facility Deleted',
  FACILITY_PHOTO_DELETED: 'Facility Photo Deleted',
  TICKET_DELETED: 'Ticket Deleted',
  TICKET_COMMENT_DELETED: 'Ticket Comment Deleted',
  PAYMENT_LOG_DELETED: 'Payment Log Deleted'
}

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

export const ENTITY_TYPE_LABEL_FALLBACK: Record<string, string> = {
  Plan: 'Plan',
  Room: 'Room',
  RoomType: 'Room Type',
  RoomPhoto: 'Room Photo',
  RoomAmenity: 'Room Amenity',
  Facility: 'Facility',
  FacilityPhoto: 'Facility Photo',
  Ticket: 'Ticket',
  TicketComment: 'Ticket Comment',
  PaymentLog: 'Payment Log'
}

import type {
  FrontDeskStatCard,
  RoomReadinessStat,
  GuestRequestItem,
  AlertItem,
} from '../types/frontDeskTypes'

export const STAT_CARDS: FrontDeskStatCard[] = [
  { title: 'Pending Check-ins', value: 12, subtitle: '3 arriving in next hour', color: 'info' },
  { title: 'Pending Check-outs', value: 8, subtitle: '2 overdue', color: 'warning' },
  { title: 'Rooms Ready', value: 24, subtitle: 'Out of 30 assigned rooms', color: 'success' },
  { title: 'Pending Payments', value: 5, subtitle: 'Awaiting settlement', color: 'error' },
]

export const TODAY_ARRIVALS = [
  {
    id: '1',
    guestName: 'Emily Carter',
    time: '09:00',
    roomNumber: '204',
  },
  {
    id: '2',
    guestName: 'James Thornton',
    time: '10:30',
    roomNumber: '501',
    note: 'VIP — champagne on arrival',
  },
  {
    id: '3',
    guestName: 'Omar Hassan',
    time: '12:00',
    roomNumber: '108',
  },
  {
    id: '4',
    guestName: 'Sofia Reyes',
    time: '13:30',
    roomNumber: '220',
    note: 'Delayed — flight pushed to 15:00',
  },
  {
    id: '5',
    guestName: 'Priya Nair',
    time: '15:00',
    roomNumber: '318',
  },
]

export const ROOM_READINESS_STATS: RoomReadinessStat[] = [
  { status: 'ready', count: 14 },
  { status: 'in-progress', count: 9 },
  { status: 'not-started', count: 7 },
]

export const GUEST_REQUESTS: GuestRequestItem[] = [
  { label: 'Extra Towels', value: 8, colorKey: 'primary' },
  { label: 'Late Checkout', value: 5, colorKey: 'warning' },
  { label: 'Room Service', value: 12, colorKey: 'success' },
  { label: 'Maintenance', value: 3, colorKey: 'error' },
]

export const ALERT_ITEMS: AlertItem[] = [
  { id: '1', severity: 'error', icon: 'tabler:bed-off', title: 'Room 318 Not Ready', description: 'Scheduled arrival at 15:00 — housekeeping still in progress' },
  { id: '2', severity: 'warning', icon: 'tabler:star', title: 'VIP Arrival — Room 601', description: 'Charles Dupont — suite upgrade confirmed, amenities pending' },
  { id: '3', severity: 'error', icon: 'tabler:credit-card-off', title: 'Pending Payment', description: 'Room 407 checkout balance unsettled since 14:00' },
  { id: '4', severity: 'warning', icon: 'tabler:clock-exclamation', title: 'Delayed Check-in', description: 'Sofia Reyes — flight pushed to 15:00, room hold active' },
  { id: '5', severity: 'info', icon: 'tabler:tool', title: 'Maintenance Request', description: 'Room 220 — reported A/C noise, ticket #1042 open' },
]

export const WEEKLY_RESERVATIONS = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 9 },
  { label: 'Thu', value: 21 },
  { label: 'Fri', value: 16 },
  { label: 'Sat', value: 25 },
  { label: 'Sun', value: 14 },
]

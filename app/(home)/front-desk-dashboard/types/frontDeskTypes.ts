export interface FrontDeskStatCard {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info'
}

export type TimelineEventType = 'arrival' | 'departure' | 'vip' | 'delayed'

export interface TimelineEvent {
  id: string
  type: TimelineEventType
  guestName: string
  time: string
  roomNumber: string
  note?: string
}

export type RoomStatus = 'ready' | 'in-progress' | 'not-started'

export interface RoomReadinessStat {
  status: RoomStatus
  count: number
}

export type PaletteColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export interface GuestRequestItem {
  label: string
  value: number
  colorKey: PaletteColorKey
}

export type TodoPriority = 'high' | 'medium' | 'low'

export interface TodoTask {
  id: string
  priority: TodoPriority
  title: string
  dueTime?: string
  done: boolean
}

export type AlertSeverity = 'error' | 'warning' | 'info'

export interface AlertItem {
  id: string
  severity: AlertSeverity
  icon: string
  title: string
  description: string
}

export interface WeeklyCalendarDay {
  date: string
  label: string
  dayNumber: number
  arrivals: number
  departures: number
  available: number
}

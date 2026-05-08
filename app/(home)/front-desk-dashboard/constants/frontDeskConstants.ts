import type { RoomStatus, AlertSeverity } from '../types/frontDeskTypes'

export const ROOM_STATUS_LABELS: Record<RoomStatus, string> = {
  ready: 'Ready',
  'in-progress': 'In Progress',
  'not-started': 'Not Started',
}

export const STAT_CARD_ICONS: string[] = [
  'tabler:door-enter',
  'tabler:door-exit',
  'tabler:bed',
  'tabler:credit-card',
]

export const ALERT_SEVERITY_LABELS: Record<AlertSeverity, string> = {
  error: 'Critical',
  warning: 'Warning',
  info: 'Info',
}

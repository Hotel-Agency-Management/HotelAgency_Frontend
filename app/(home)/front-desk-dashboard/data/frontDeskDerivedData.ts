import { GUEST_REQUESTS, ROOM_READINESS_STATS } from './frontDeskMock'

export const guestRequestsData = GUEST_REQUESTS.map((r) => ({
  label: r.label,
  value: r.value,
}))

export const guestRequestsTotal = GUEST_REQUESTS.reduce((sum, r) => sum + r.value, 0)

export const roomReadinessTotal = ROOM_READINESS_STATS.reduce((sum, s) => sum + s.count, 0)

export const readyRoomsCount = ROOM_READINESS_STATS.find((s) => s.status === 'ready')?.count ?? 0

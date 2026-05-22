import { ISO_DATE_ONLY_PATTERN, TIMEZONE_PATTERN, DAY_MS } from "../constants/date"

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function parseApiDate(value: string): Date {
  if (ISO_DATE_ONLY_PATTERN.test(value)) {
    return new Date(`${value}T00:00:00Z`)
  }

  if (TIMEZONE_PATTERN.test(value)) {
    return new Date(value)
  }

  return new Date(`${value}Z`)
}

export function getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function getPaymentWeekStart(date: Date): Date {
  const d = startOfDay(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

export function formatPaymentDateTime(iso: string) {
  const date = parseApiDate(iso)
  const timeZone = getUserTimeZone()
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  })
  const today = startOfDay(new Date())
  const paymentDay = startOfDay(date)
  const dayDiff = Math.round((paymentDay.getTime() - today.getTime()) / DAY_MS)

  if (dayDiff === 0) return `Today, ${time}`
  if (dayDiff === -1) return `Yesterday, ${time}`
  if (dayDiff === 1) return `Tomorrow, ${time}`

  const label =
    Math.abs(dayDiff) < 7
      ? date.toLocaleDateString('en-US', { weekday: 'short', timeZone })
      : date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone,
        })

  return `${label}, ${time}`
}

export function formatPaymentWeekLabel(monday: Date): string {
  const thisMonday = getPaymentWeekStart(new Date())
  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)

  if (monday.getTime() === thisMonday.getTime()) return 'This Week'
  if (monday.getTime() === lastMonday.getTime()) return 'Last Week'

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const formatDay = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return `${formatDay(monday)} - ${formatDay(sunday)}, ${sunday.getFullYear()}`
}

export function formatAmount(amount: number, isIncoming?: boolean) {
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  if (isIncoming === undefined) return formatted
  return isIncoming ? `+${formatted}` : `-${formatted}`
}

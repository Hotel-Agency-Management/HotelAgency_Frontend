import type { TFunction } from 'i18next'

const DAY_MS = 86400000

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function getWeekStart(date: Date): Date {
  const d = startOfDay(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

export function formatLogDateTime(iso: string, t: TFunction, locale: string) {
  const date = new Date(iso)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const time = date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone
  })
  const today = startOfDay(new Date())
  const logDay = startOfDay(date)
  const dayDiff = Math.round((logDay.getTime() - today.getTime()) / DAY_MS)

  if (dayDiff === 0) return `${t('systemLogs.dateGroups.today', { defaultValue: 'Today' })}, ${time}`
  if (dayDiff === -1) return `${t('systemLogs.dateGroups.yesterday', { defaultValue: 'Yesterday' })}, ${time}`

  const label =
    Math.abs(dayDiff) < 7
      ? date.toLocaleDateString(locale, { weekday: 'short', timeZone })
      : date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric', timeZone })

  return `${label}, ${time}`
}

export function formatWeekLabel(monday: Date, t: TFunction, locale: string): string {
  const thisMonday = getWeekStart(new Date())
  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)

  if (monday.getTime() === thisMonday.getTime()) return t('systemLogs.dateGroups.thisWeek', { defaultValue: 'This Week' })
  if (monday.getTime() === lastMonday.getTime()) return t('systemLogs.dateGroups.lastWeek', { defaultValue: 'Last Week' })

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const formatDay = (date: Date) => date.toLocaleDateString(locale, { month: 'short', day: 'numeric' })

  return `${formatDay(monday)} - ${formatDay(sunday)}, ${sunday.getFullYear()}`
}

import { getPaymentWeekStart, formatPaymentWeekLabel } from './dateFormat'
import type { PaymentLog } from '../types'

export function groupByWeek(payments: PaymentLog[]) {
  const map: Record<string, { monday: Date; items: PaymentLog[] }> = {}
  for (const p of payments) {
    const monday = getPaymentWeekStart(new Date(p.createdAt))
    const key = monday.toISOString()
    if (!map[key]) map[key] = { monday, items: [] }
    map[key].items.push(p)
  }
  return Object.entries(map)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, { monday, items }]) => ({ key, label: formatPaymentWeekLabel(monday), items }))
}

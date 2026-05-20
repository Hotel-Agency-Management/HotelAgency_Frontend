import { getPaymentWeekStart, formatPaymentWeekLabel, parseApiDate } from './dateFormat'
import type { PaymentLogItem } from '../config/paymentLogsConfig'

export function groupByWeek(payments: PaymentLogItem[]) {
  const map: Record<string, { monday: Date; items: PaymentLogItem[] }> = {}
  for (const p of payments) {
    const monday = getPaymentWeekStart(parseApiDate(p.createdAt))
    const key = monday.toISOString()
    if (!map[key]) map[key] = { monday, items: [] }
    map[key].items.push(p)
  }
  return Object.entries(map)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, { monday, items }]) => ({ key, label: formatPaymentWeekLabel(monday), items }))
}

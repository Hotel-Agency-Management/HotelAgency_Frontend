export function formatMonthLabel(yearMonth: string, locale: string): string {
  const [year, month] = yearMonth.split('-')
  const date = new Date(Number(year), Number(month) - 1, 1)
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(date)
}

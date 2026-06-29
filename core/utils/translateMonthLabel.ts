import type { TFunction } from 'i18next'

const MONTH_ABBRS = new Set(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'])

export function translateMonthLabel(label: string, t: TFunction): string {
  if (MONTH_ABBRS.has(label)) return t(`common.months.${label}`, { defaultValue: label })
  // Handle "MMM YYYY" format returned by some APIs (e.g. "Jul 2025")
  const parts = label.split(' ')
  if (parts.length === 2 && MONTH_ABBRS.has(parts[0])) {
    const translatedMonth = t(`common.months.${parts[0]}`, { defaultValue: parts[0] })
    return `${translatedMonth}\n${parts[1]}`
  }
  return label
}

export function translateMonthLabels(labels: string[], t: TFunction): string[] {
  return labels.map(l => translateMonthLabel(l, t))
}

export function translateMonthYearLabel(label: string, t: TFunction): string {
  const parts = label.split(' ')
  if (parts.length === 2 && MONTH_ABBRS.has(parts[0])) {
    return `${t(`common.months.${parts[0]}`, { defaultValue: parts[0] })} ${parts[1]}`
  }
  return translateMonthLabel(label, t)
}

/**
 * Builds x-axis labels for a month+year data series.
 * Shows "Month Year" only on the first item and when the year changes;
 * all other items show just the translated month name.
 */
export function buildMonthYearLabels<T extends { month: string; year: number }>(
  items: T[],
  t: TFunction
): string[] {
  return items.map(item => {
    const month = t(`common.months.${item.month}`, { defaultValue: item.month })
    return `${month}\n${item.year}`
  })
}

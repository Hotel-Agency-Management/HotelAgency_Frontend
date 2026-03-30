/**
 * Lightweight date formatting utilities.
 * Native Intl.DateTimeFormat — zero dependencies.
 */

/** "Nov 28, 2024" */
export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day:   '2-digit',
    year:  'numeric',
  }).format(new Date(iso))
}

/** "November 28, 2024 · 9:14 AM" */
export function formatFullDate(iso: string): string {
  const date = new Date(iso)
  const datePart = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day:   '2-digit',
    year:  'numeric',
  }).format(date)
  const timePart = new Intl.DateTimeFormat('en-US', {
    hour:   'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
  return `${datePart} · ${timePart}`
}

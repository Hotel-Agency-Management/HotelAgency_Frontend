export function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(value)
}

export function formatCapacity(capacity: number) {
  return `${capacity} guest${capacity === 1 ? '' : 's'}`
}

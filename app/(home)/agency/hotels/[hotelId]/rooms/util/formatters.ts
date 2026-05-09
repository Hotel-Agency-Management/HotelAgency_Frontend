export function formatPrice(value: number, currency: string) {
  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value)

  return `${formattedValue} ${currency}`
}

export function formatCapacity(capacity: number) {
  return `${capacity} guest${capacity === 1 ? '' : 's'}`
}

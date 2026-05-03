let invoiceSequence = 0

export function generateDamageInvoiceNumber(): string {
  invoiceSequence += 1
  const year = new Date().getFullYear()
  const seq = String(invoiceSequence).padStart(4, '0')
  return `HOTEL-DMG-${year}-${seq}`
}

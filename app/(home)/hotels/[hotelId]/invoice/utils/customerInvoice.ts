import type { CalculateInvoiceTotalInput, InvoiceTotal } from '../types/customerInvoice'

const roundCurrency = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100

export const calculateInvoiceTotal = ({
  pricePerNight,
  nights,
  rooms,
  taxRate,
  discount,
}: CalculateInvoiceTotalInput): InvoiceTotal => {
  const subtotal = roundCurrency(pricePerNight * nights * rooms)
  const taxAmount = roundCurrency(subtotal * taxRate)
  const discountAmount = roundCurrency(Math.min(Math.max(discount, 0), subtotal + taxAmount))
  const totalAmount = roundCurrency(subtotal + taxAmount - discountAmount)

  return {
    subtotal,
    taxAmount,
    discountAmount,
    totalAmount,
  }
}

export const generateInvoiceNumber = (sequence: number, prefix = 'HOTEL-INV') => {
  const year = new Date().getFullYear()
  const paddedSequence = String(sequence).padStart(4, '0')

  return `${prefix}-${year}-${paddedSequence}`
}

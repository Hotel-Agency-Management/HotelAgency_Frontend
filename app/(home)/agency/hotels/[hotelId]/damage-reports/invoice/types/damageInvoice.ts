export type DamageInvoiceStatus = 'paid' | 'unpaid' | 'void'

export interface DamageInvoice {
  invoiceNumber: string
  reportId: string
  reservationId?: string
  customerName: string
  customerEmail?: string
  hotelName: string
  hotelLogo?: string | null
  hotelPrimaryColor?: string
  hotelSecondaryColor?: string
  roomNumber: string
  damageDescription: string
  damageAmount: number
  currency: string
  invoiceDate: string
  invoiceStatus: DamageInvoiceStatus
}

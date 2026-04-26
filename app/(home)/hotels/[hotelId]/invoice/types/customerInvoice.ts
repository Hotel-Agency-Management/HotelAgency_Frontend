export const CUSTOMER_INVOICE_STATUS = {
  PAID: 'paid',
  UNPAID: 'unpaid',
  VOID: 'void',
} as const

export type CustomerInvoiceStatus =
  (typeof CUSTOMER_INVOICE_STATUS)[keyof typeof CUSTOMER_INVOICE_STATUS]

export interface CustomerInvoice {
  invoiceNumber: string
  reservationId: string
  customerName: string
  customerEmail: string
  hotelName: string
  hotelLogo?: string | null
  hotelPrimaryColor?: string
  hotelSecondaryColor?: string
  hotelCountry?: string
  hotelCity?: string
  hotelState?: string
  hotelAddress?: string
  hotelZip?: string
  roomName: string
  roomType: string
  currency: string
  checkInDate: string
  checkOutDate: string
  nights: number
  numberOfRooms: number
  pricePerNight: number
  subtotal: number
  taxes: number
  discount: number
  totalAmount: number
  paymentMethod: string
  bookingSource: string
  invoiceDate: string
  invoiceStatus: CustomerInvoiceStatus
}

export interface CalculateInvoiceTotalInput {
  pricePerNight: number
  nights: number
  rooms: number
  taxRate: number
  discount: number
}

export interface InvoiceTotal {
  subtotal: number
  taxAmount: number
  discountAmount: number
  totalAmount: number
}

export interface CreateCustomerInvoiceInput {
  reservationId: string
  customerName: string
  customerEmail: string
  hotelName: string
  hotelLogo?: string | null
  hotelPrimaryColor?: string
  hotelSecondaryColor?: string
  hotelCountry?: string
  hotelCity?: string
  hotelState?: string
  hotelAddress?: string
  hotelZip?: string
  roomName: string
  roomType: string
  currency: string
  checkInDate: string
  checkOutDate: string
  nights: number
  numberOfRooms: number
  pricePerNight: number
  taxRate?: number
  discount?: number
  paymentMethod: string
  bookingSource: string
  invoiceStatus?: CustomerInvoiceStatus
}

export interface CustomerInvoiceDocumentProps {
  invoice: CustomerInvoice
}

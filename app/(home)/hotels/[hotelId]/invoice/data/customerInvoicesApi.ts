// TODO: Replace with real API calls when backend is ready.
// This mock mirrors the reservation mock API so invoices are persisted for the session.

import { sleep } from '@/app/(home)/agency/hotels/[hotelId]/rooms/util/delay'
import {
  CUSTOMER_INVOICE_STATUS,
  type CreateCustomerInvoiceInput,
  type CustomerInvoice,
} from '../types/customerInvoice'
import { calculateInvoiceTotal, generateInvoiceNumber } from '../utils/customerInvoice'
import { getTaxDataPrice } from './taxDataClient'

let mockInvoices: CustomerInvoice[] = []

export const customerInvoicesApi = {
  createInvoice: async (input: CreateCustomerInvoiceInput) => {
    await sleep(120)

    const subtotal = input.pricePerNight * input.nights * input.numberOfRooms
    const taxData = await getTaxDataPrice({
      amount: subtotal,
      country: input.hotelCountry,
      city: input.hotelCity,
      state: input.hotelState,
      street: input.hotelAddress,
      zip: input.hotelZip,
      type: 'hotels',
    })

    const totals = calculateInvoiceTotal({
      pricePerNight: input.pricePerNight,
      nights: input.nights,
      rooms: input.numberOfRooms,
      taxRate: taxData?.taxRate ?? input.taxRate ?? 0,
      discount: input.discount ?? 0,
    })

    const invoice: CustomerInvoice = {
      invoiceNumber: generateInvoiceNumber(mockInvoices.length + 1),
      reservationId: input.reservationId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      hotelName: input.hotelName,
      hotelLogo: input.hotelLogo,
      hotelPrimaryColor: input.hotelPrimaryColor,
      hotelSecondaryColor: input.hotelSecondaryColor,
      hotelCountry: input.hotelCountry,
      hotelCity: input.hotelCity,
      hotelState: input.hotelState,
      hotelAddress: input.hotelAddress,
      hotelZip: input.hotelZip,
      roomName: input.roomName,
      roomType: input.roomType,
      currency: input.currency,
      checkInDate: input.checkInDate,
      checkOutDate: input.checkOutDate,
      nights: input.nights,
      numberOfRooms: input.numberOfRooms,
      pricePerNight: input.pricePerNight,
      subtotal: totals.subtotal,
      taxes: totals.taxAmount,
      discount: totals.discountAmount,
      totalAmount: totals.totalAmount,
      paymentMethod: input.paymentMethod,
      bookingSource: input.bookingSource,
      invoiceDate: new Date().toISOString(),
      invoiceStatus: input.invoiceStatus ?? CUSTOMER_INVOICE_STATUS.PAID,
    }

    mockInvoices = [...mockInvoices, invoice]

    return invoice
  },

  getInvoiceByReservationId: async (reservationId: string) => {
    await sleep(80)

    return mockInvoices.find(invoice => invoice.reservationId === reservationId) ?? null
  },
}

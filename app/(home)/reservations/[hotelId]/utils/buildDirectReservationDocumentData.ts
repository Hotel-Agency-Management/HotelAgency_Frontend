import dayjs from 'dayjs'
import type { BrandingSettings } from '@/core/theme/palette/branding'
import type { UserProfile } from '@/app/(home)/profile/configs/userProfileConfig'
import type { ReservationContractData } from '@/app/(home)/hotels/[hotelId]/types/customerReservationContract'
import type { CustomerInvoice } from '@/app/(home)/hotels/[hotelId]/invoice/types/customerInvoice'
import { generateInvoiceNumber } from '@/app/(home)/hotels/[hotelId]/invoice/utils/customerInvoice'
import type { TermsResponse } from '@/app/(home)/agency/hotels/terms-and-conditions/types/terms'
import type { RoomListItemResponse } from '@/app/(home)/agency/hotels/[hotelId]/rooms/configs/roomConfig'
import type { DirectReservationFormInput } from '../schema/directReservationSchema'

function getSelectedRooms(values: DirectReservationFormInput, rooms: RoomListItemResponse[]) {
  return rooms.filter(r => values.roomNumbers.includes(r.roomNumber))
}

function getUniqueRoomTypes(selectedRooms: RoomListItemResponse[]): string {
  const types = selectedRooms.map(r => r.roomType)
  return [...new Set(types)].join(', ') || 'Standard'
}

function getTotalCapacity(selectedRooms: RoomListItemResponse[]): number {
  return selectedRooms.reduce((sum, r) => sum + r.capacity, 0)
}

function getNights(checkIn: string, checkOut: string): number {
  return Math.max(0, dayjs(checkOut).diff(dayjs(checkIn), 'day'))
}

export function buildDirectReservationContractData(
  values: DirectReservationFormInput,
  profile: UserProfile,
  branding: BrandingSettings,
  rooms: RoomListItemResponse[],
  terms: TermsResponse | null
): ReservationContractData {
  const selectedRooms = getSelectedRooms(values, rooms)
  const nights = getNights(values.checkInDate, values.checkOutDate)
  const capacity = getTotalCapacity(selectedRooms)

  return {
    issuedAt: new Date().toISOString(),
    hotel: {
      name: profile.hotel?.hotelName ?? '',
      agencyName: profile.agency?.name,
      phone: profile.hotel?.phone,
      country: profile.hotel?.hotelCountry,
      city: profile.hotel?.hotelCity,
      logo: profile.hotel?.hotelLogo,
      primaryColor: branding.colors.primary,
      secondaryColor: branding.colors.secondary,
    },
    guest: {
      name: values.guestFullName,
      email: values.guestEmail,
      phone: values.guestPhone,
    },
    stay: {
      reservationId: 'PENDING',
      roomNumber: values.roomNumbers.join(', '),
      roomType: getUniqueRoomTypes(selectedRooms),
      checkIn: dayjs(values.checkInDate).format('MMMM D, YYYY'),
      checkOut: dayjs(values.checkOutDate).format('MMMM D, YYYY'),
      stayLength: nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}` : '-',
      guests: values.numberOfGuests as number,
      rooms: values.roomNumbers.length,
      capacity: capacity > 0 ? `${capacity} guests` : '-',
    },
    terms: {
      title: terms?.title ?? 'Terms & Conditions',
      content: terms?.content ?? '',
      acceptedAt: new Date().toISOString(),
    },
    customerSignatureDataUrl: values.employeeSignatureDataUrl,
  }
}

export function buildDirectReservationInvoiceData(
  values: DirectReservationFormInput,
  profile: UserProfile,
  branding: BrandingSettings,
  rooms: RoomListItemResponse[],
  currency: string
): CustomerInvoice {
  const selectedRooms = getSelectedRooms(values, rooms)
  const nights = getNights(values.checkInDate, values.checkOutDate)
  const pricePerNight = selectedRooms.reduce((sum, r) => sum + r.pricePerNight, 0)
  const totalAmount = values.totalAmount

  return {
    invoiceNumber: generateInvoiceNumber(Date.now() % 10000),
    reservationId: 'PENDING',
    customerName: values.guestFullName,
    customerEmail: values.guestEmail,
    hotelName: profile.hotel?.hotelName ?? '',
    hotelLogo: profile.hotel?.hotelLogo,
    hotelPrimaryColor: branding.colors.primary,
    hotelSecondaryColor: branding.colors.secondary,
    hotelCountry: profile.hotel?.hotelCountry,
    hotelCity: profile.hotel?.hotelCity,
    roomName: values.roomNumbers.join(', '),
    roomType: getUniqueRoomTypes(selectedRooms),
    currency: currency || 'USD',
    checkInDate: values.checkInDate,
    checkOutDate: values.checkOutDate,
    nights,
    numberOfRooms: values.roomNumbers.length,
    pricePerNight,
    subtotal: totalAmount,
    taxes: 0,
    discount: 0,
    totalAmount,
    paymentMethod: 'Direct',
    bookingSource: values.source,
    invoiceDate: new Date().toISOString(),
    invoiceStatus: 'unpaid',
  }
}

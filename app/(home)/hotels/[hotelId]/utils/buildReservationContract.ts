import type { CustomerHotel } from '@/app/(home)/hotels/types/customerHotel'
import type { User } from '@/core/configs/authConfig'
import type { CustomerReservation } from '../types/customerReservation'
import type { ReservationContractData } from '../types/customerReservationContract'
import { formatBookingDate, getStayLength } from './roomBooking'

interface BuildReservationContractOptions {
  reservation: CustomerReservation
  hotel: CustomerHotel | null
  user: User | null
  roomCapacity: number
  roomTypeLabel: string
  language: string
  termsTitle: string
  termsContent: string
}

const getGuestName = (user: User | null) =>
  user?.name ||
  [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
  user?.email ||
  'Guest customer'

export const buildReservationContract = ({
  reservation,
  hotel,
  user,
  roomCapacity,
  roomTypeLabel,
  language,
  termsTitle,
  termsContent,
}: BuildReservationContractOptions): ReservationContractData => {
  const stayLength = getStayLength(reservation.checkIn, reservation.checkOut)

  return {
    issuedAt: new Date().toISOString(),
    hotel: {
      name: hotel?.name ?? reservation.hotelName,
      agencyName: hotel?.agencyName,
      phone: hotel?.phone,
      country: hotel?.country,
      city: hotel?.city,
      address: hotel?.address,
      logo: hotel?.logo ?? hotel?.branding.logo,
      primaryColor: hotel?.branding.colors.primary,
      secondaryColor: hotel?.branding.colors.secondary,
    },
    guest: {
      name: getGuestName(user),
      email: user?.email,
      phone: user?.phoneNumber,
    },
    stay: {
      reservationId: reservation.id,
      roomNumber: reservation.roomNumber,
      roomType: roomTypeLabel,
      checkIn: formatBookingDate(reservation.checkIn, language),
      checkOut: formatBookingDate(reservation.checkOut, language),
      stayLength: stayLength > 0 ? `${stayLength} night${stayLength > 1 ? 's' : ''}` : '-',
      guests: reservation.guests,
      rooms: reservation.rooms,
      capacity: `${roomCapacity} guests`,
    },
    terms: {
      title: termsTitle,
      content: termsContent,
      acceptedAt: reservation.termsAcceptedAt ?? reservation.createdAt,
    },
    customerSignatureDataUrl: reservation.customerSignatureDataUrl ?? '',
  }
}

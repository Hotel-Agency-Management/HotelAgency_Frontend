export interface ReservationContractHotelInfo {
  name: string
  agencyName?: string
  phone?: string
  country?: string
  city?: string
  address?: string
  logo?: string | null
  primaryColor?: string
  secondaryColor?: string
}

export interface ReservationContractGuestInfo {
  name: string
  email?: string
  phone?: string
}

export interface ReservationContractStayInfo {
  reservationId: string
  roomNumber: string
  roomType: string
  checkIn: string
  checkOut: string
  stayLength: string
  guests: number
  rooms: number
  capacity: string
}

export interface ReservationContractTermsInfo {
  title: string
  content: string
  acceptedAt: string
}

export interface ReservationContractData {
  issuedAt: string
  hotel: ReservationContractHotelInfo
  guest: ReservationContractGuestInfo
  stay: ReservationContractStayInfo
  terms: ReservationContractTermsInfo
  customerSignatureDataUrl: string
}

export interface ReservationContractDocumentProps {
  contract: ReservationContractData
}

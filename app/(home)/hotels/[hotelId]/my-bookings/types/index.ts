export interface ReservationListItem {
  id: number
  reservationNumber: string
  roomNumbers: string[]
  guestFullName: string
  status: string
  checkInDate: string
  checkOutDate: string
  createdAt: string
  totalAmount: number
}

export interface ReservationsListResponse {
  items: ReservationListItem[]
}

export interface ReservationDetail {
  id: number
  reservationNumber: string
  hotelId: number
  hotelName: string
  roomNumbers: string[]
  customerId: number
  source: string
  status: string
  guestFullName: string
  guestEmail: string
  guestPhone: string
  totalAmount: number
  guestIdNumber: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number
  numberOfRooms: number
  contractUrl: string | null
  invoiceUrl: string | null
  specialRequests: string | null
  notes: string | null
  createdById: number
  updatedById: number
}
export type BookingsView = 'cards' | 'list'

export interface ReservationListItem {
  id: number
  reservationNumber: string
  hotelId: number
  roomNumbers: Array<string | number>
  guestFullName: string
  status: string
  checkInDate: string
  checkOutDate: string
  totalAmount: number
  taxAmount: number
  hasInsurance: boolean
  insuranceAmount: number
}

export interface ReservationsListResponse {
  items: ReservationListItem[]
}

export interface CustomerReservationListResponse {
  items: ReservationListItem[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface ReservationDetail {
  id: number
  reservationNumber: string
  hotelId: number
  hotelName: string
  roomNumbers: Array<string | number>
  customerId: number
  status: string
  guestFullName: string
  guestEmail: string
  guestPhone: string
  hasInsurance: boolean
  insuranceAmount: number
  guestNumber: string
  checkInDate: string
  checkOutDate: string
  numberOfRooms: number
  numberOfGuests: number
  contractUrl: string | null
  invoiceUrl: string | null
  specialRequests: string | null
  notes: string | null
  createdById: number | null
  totalAmount?: number
  taxAmount?: number
  createdAt: string
  updatedAt: string
}

export interface CreateCustomerReservationRequest {
  roomNumbers: string[]
  guestsNumber: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number
  specialRequests?: string | null
  notes?: string | null
  contractFile?: File
  invoiceFile?: File
  hasInsurance: boolean
}

export interface UpdateCustomerReservationRequest {
  checkInDate?: string
  checkOutDate?: string
  numberOfGuests?: number
  hasInsurance?: boolean
  specialRequests?: string | null
  notes?: string | null
  guestPhone?: string
  guestNumber?: string
}

export interface CancelCustomerReservationResponse {
  reservationId: number
  status: string
  totalAmount: number
  cancellationFee: number
  isFreeCanellation: boolean
  cancelledAt: string
  message: string
}

export type BookingsView = 'cards' | 'list'

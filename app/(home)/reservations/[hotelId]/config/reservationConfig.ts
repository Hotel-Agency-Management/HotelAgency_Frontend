export enum ReservationSource {
  Website = 'Website',
  WalkIn = 'WalkIn',
  Phone = 'Phone',
}

export interface ReservationBase {
  roomNumbers: string[]
  source: ReservationSource
  guestFullName: string
  guestEmail: string
  guestPhone: string
  guestIdNumber?: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests: number
  totalAmount: number
  specialRequests?: string | null
  notes?: string | null
}

export interface CreateReservationRequest extends ReservationBase {
  contractFile?: File | null
  invoiceFile?: File | null
}

export interface ReservationResponse extends ReservationBase {
  id: number
  reservationNumber: string
  hotelId: number
  hotelName: string
  customerId: number
  status: string
  hasInsurance: boolean
  insuranceAmount: number
  guestIdNumber: string
  numberOfRooms: number
  contractUrl: string | null
  invoiceUrl: string | null
  createdById: number
  updatedById: number | null
  createdAt: string
  updatedAt: string
}

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
  hasInsurance: boolean
  insuranceAmount: number
}

export interface PaginatedReservationsResponse {
  items: ReservationListItem[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

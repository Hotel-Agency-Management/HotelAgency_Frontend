export interface PublicRoomsQueryParams {
  pageNumber?: number
  pageSize?: number
  searchText?: string
  roomTypeId?: number
  guests?: number
  maxPrice?: number
  checkIn?: string
  checkOut?: string
}

export interface PublicRoomsResult {
  items: PublicRoom[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface PublicRoomPhoto {
  id: number
  url: string
  isPrimary?: boolean
  isCoverPhoto?: boolean
}

export interface PublicRoomAmenity {
  id: number
  name: string
}

export interface PublicRoom {
  id?: number
  roomId: number
  roomNumber: string
  roomType?: string
  roomTypeName?: string
  pricePerNight: number
  status: string
  description?: string | null
  notes?: string
  capacity: number
  bedType?: string
  starRating?: number
  amenities: Array<string | PublicRoomAmenity>
  mainPhotoUrl?: string | null
  floorNumber?: number
  roomTypeId?: number
  coverPhotoUrl?: string | null
  dailyPrice?: number
  weeklyPrice?: number
  monthlyPrice?: number
  extendPrice?: number
  createdAt?: string
  updatedAt?: string
}

export interface PublicRoomsApiPayload {
  items: PublicRoom[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

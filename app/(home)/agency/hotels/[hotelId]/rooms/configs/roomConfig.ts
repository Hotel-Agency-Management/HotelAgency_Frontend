export enum RoomStatus {
  Available = 'Available',
  Occupied = 'Occupied',
  Reserved = 'Reserved',
  Maintenance = 'Maintenance',
  OutOfService = 'OutOfService',
}

export interface RoomAmenityResponse {
  id: number
  name: string
}

export interface RoomResponse {
  id: number
  hotelId: number
  roomTypeId: number
  roomTypeName: string
  roomNumber: string
  floorNumber: number
  description: string
  status: RoomStatus
  notes: string
  dailyPrice: number
  weeklyPrice: number
  monthlyPrice: number
  extendPrice: number
  insurance: number
  capacity: number
  createdAt: string
  updatedAt: string
  coverPhotoUrl: string | null
  amenities: RoomAmenityResponse[]
}

export interface RoomListItemResponse {
  roomId: number
  hotelId: number
  roomType: string
  roomNumber: string
  floorNumber: number
  status: RoomStatus
  pricePerNight: number
  capacity: number
  description: string | null
  amenities: string[]
  mainPhotoUrl: string | null
}

export interface CreateRoomRequest {
  roomTypeId: number
  roomNumber: string
  floorNumber: number
  description?: string
  status: RoomStatus | number
  notes?: string
  coverPhoto?: File | null
  amenityIds: number[]
  dailyPrice: number
  weeklyPrice: number
  monthlyPrice: number
  extendPrice: number
  insurance: number
  capacity: number
}
export interface UpdateRoomRequest extends CreateRoomRequest {}

export interface RoomListParams {
  pageNumber?: number
  pageSize?: number
  searchText?: string
  roomTypeId?: number
  guests?: number
  maxPrice?: number
  checkIn?: string
  checkOut?: string
}

export interface RoomListResponse {
  items: RoomListItemResponse[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export const BASE_ADMIN = '/admin/agencies'

export const BASE = '/hotels'

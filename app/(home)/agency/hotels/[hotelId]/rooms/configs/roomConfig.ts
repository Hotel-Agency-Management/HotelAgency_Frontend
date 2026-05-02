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
  capacity: number
  createdAt: string
  updatedAt: string
  coverPhotoUrl: string | null
  amenities: RoomAmenityResponse[]
}

export interface RoomListItemResponse {
  id: number
  hotelId: number
  roomTypeName: string
  roomNumber: string
  floorNumber: number
  status: RoomStatus
  dailyPrice: number
  capacity: number
  coverPhotoUrl: string | null
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
  capacity: number
}
export interface UpdateRoomRequest extends CreateRoomRequest {}

export const BASE_ADMIN = '/admin/agencies'

export const BASE = '/hotels'

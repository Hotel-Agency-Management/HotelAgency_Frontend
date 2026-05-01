export interface RoomAmenityResponse {
  id: number
  name: string
}

export interface CreateRoomAmenityRequest {
  name: string
}

export const ADMIN_BASE = '/admin/room-amenities'
export const BASE = '/room-amenities'

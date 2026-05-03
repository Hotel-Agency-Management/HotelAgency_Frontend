export interface RoomAmenity {
  id: number
  name: string
}

export type CreateRoomAmenityDto = {
  name: string
}

export interface RoomAmenityFilters {
  search?: string
}

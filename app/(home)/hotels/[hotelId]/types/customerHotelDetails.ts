export interface CustomerRoomSearchFilters {
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  query: string
  roomTypeId: string
  maxPrice: string
}

export interface CustomerHotelRoomProfile {
  priceMultiplier: number
  roomPrefix: string
  amenities: string[]
}

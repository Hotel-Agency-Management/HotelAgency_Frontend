import { CustomerHotelRoomProfile } from "../types/customerHotelDetails"

export const DEFAULT_ROOM_PROFILE: CustomerHotelRoomProfile = {
  priceMultiplier: 1,
  roomPrefix: '',
  amenities: ['free cancellation', 'breakfast option'],
}

export const HOTEL_ROOM_PROFILES: Record<string, CustomerHotelRoomProfile> = {
  '1': {
    priceMultiplier: 1.35,
    roomPrefix: 'GP',
    amenities: ['city skyline', 'spa access'],
  },
  '2': {
    priceMultiplier: 1.2,
    roomPrefix: 'AZ',
    amenities: ['waterfront view', 'executive lounge'],
  },
  '3': {
    priceMultiplier: 1.1,
    roomPrefix: 'DR',
    amenities: ['family package', 'desert view'],
  },
  '4': {
    priceMultiplier: 0.95,
    roomPrefix: 'NL',
    amenities: ['mountain view', 'guided hikes'],
  },
  '5': {
    priceMultiplier: 1.18,
    roomPrefix: 'SU',
    amenities: ['metro access', 'workspace'],
  },
  '6': {
    priceMultiplier: 1.28,
    roomPrefix: 'MV',
    amenities: ['beach access', 'private balcony'],
  },
}

export const fallbackCover = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1800&q=80'


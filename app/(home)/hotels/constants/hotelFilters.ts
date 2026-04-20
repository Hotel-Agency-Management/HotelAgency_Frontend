import type { HotelSortOption } from '../types/customerHotel'
import type { CSSProperties } from 'react'

export const HOTEL_SORT_OPTIONS: { value: HotelSortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'rating-desc', label: 'Top rated' },
]

export const DEFAULT_HOTEL_FILTERS = {
  destination: 'all',
  query: '',
  sort: 'recommended',
} as const

const heroImage = 'url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&q=80)'
export const heroStyle = { '--customer-hotel-hero-image': heroImage } as CSSProperties

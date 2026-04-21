import type { CustomerHotel, CustomerHotelFilters } from '../types/customerHotel'

const normalize = (value: string) => value.trim().toLowerCase()

const matchesDestination = (hotel: CustomerHotel, destination: string) => {
  if (destination === 'all') return true

  const value = normalize(destination)
  return normalize(`${hotel.city}, ${hotel.country}`) === value
}

const matchesQuery = (hotel: CustomerHotel, query: string) => {
  const value = normalize(query)
  if (!value) return true

  return [
    hotel.name,
    hotel.agencyName,
    hotel.city,
    hotel.country,
    hotel.address,
    ...hotel.amenities,
  ].some(field => normalize(field).includes(value))
}

export const getHotelDestinationOptions = (hotels: CustomerHotel[]) =>
  Array.from(new Set(hotels.map(hotel => `${hotel.city}, ${hotel.country}`))).sort((a, b) => a.localeCompare(b))

export const filterCustomerHotels = (hotels: CustomerHotel[], filters: CustomerHotelFilters) => {
  const filtered = hotels.filter(
    hotel =>
      matchesDestination(hotel, filters.destination) &&
      matchesQuery(hotel, filters.query)
  )

  return filtered.sort((a, b) => {
    if (filters.sort === 'rating-desc') return b.rating - a.rating
    return Number(b.isActive) - Number(a.isActive) || b.rating - a.rating
  })
}

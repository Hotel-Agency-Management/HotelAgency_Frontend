import type { ReservationContractData } from '../types/customerReservationContract'

// Converts rich HTML contract text into clean plain text by replacing line breaks,
// removing HTML tags, decoding common HTML entities, collapsing excessive empty lines,
// and trimming whitespace.
export const sanitizeContractText = (value: string) =>
  value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

export const getContractTermsPreview = (value: string, maxLength = 420) => {
  const cleanValue = sanitizeContractText(value).replace(/\s+/g, ' ')

  if (cleanValue.length <= maxLength) {
    return cleanValue
  }

  return `${cleanValue.slice(0, maxLength).trim()}...`
}

export const buildContractLocation = (contract: ReservationContractData) =>
  [contract.hotel.address, contract.hotel.city, contract.hotel.country].filter(Boolean).join(', ')

export const formatContractDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(value))

export const getHotelInitials = (hotelName: string) =>
  hotelName
    .split(' ')
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()

export const buildContractFileName = (contract: ReservationContractData) =>
  `${contract.hotel.name}-${contract.stay.reservationId}-contract.pdf`
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')

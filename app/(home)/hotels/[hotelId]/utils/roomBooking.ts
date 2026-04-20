export const formatCurrency = (
  value: number | null | undefined,
  language: string,
  currency = 'USD'
) => {
  if (value == null) {
    return '—'
  }

  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  }).format(value)
}

export const formatBookingDate = (value: string, language: string) => {
  if (!value) {
    return 'To be selected'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'To be selected'
  }

  return new Intl.DateTimeFormat(language, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export const getStayLength = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0
  }

  const diffInMs = end.getTime() - start.getTime()
  const nights = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))

  return nights > 0 ? nights : 0
}

export const getTotalReservationPrice = (
  pricePerNight: number | null | undefined,
  stayLength: number,
  rooms: number
) => {
  if (pricePerNight == null || stayLength <= 0 || rooms <= 0) {
    return null
  }

  return pricePerNight * stayLength * rooms
}

export const getRoomDetails = (
  room: {
    floorNumber: number
    capacity: number
    pricePerNight?: number | null
  },
  t: (key: string) => string,
  language: string,
  currency = 'USD'
) => [
  {
    label: t('hotelRooms.profile.floor'),
    value: room.floorNumber,
  },
  {
    label: t('hotelRooms.profile.capacity'),
    value: room.capacity,
  },
  {
    label: t('hotelRooms.profile.pricePerNight'),
    value: formatCurrency(room.pricePerNight, language, currency),
  },
]

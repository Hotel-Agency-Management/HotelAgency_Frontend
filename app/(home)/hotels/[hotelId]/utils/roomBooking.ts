export const formatCurrency = (value: number | null | undefined, language: string) => {
  if (value == null) {
    return '—'
  }

  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const getRoomDetails = (
  room: {
    floorNumber: number
    capacity: number
    pricePerNight?: number | null
  },
  t: (key: string) => string,
  language: string
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
    value: formatCurrency(room.pricePerNight, language),
  },
]

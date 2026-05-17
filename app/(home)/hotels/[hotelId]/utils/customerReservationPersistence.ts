const STORAGE_PREFIX = 'customer-room-reservation'

const getStorageKey = (hotelId: string, roomNumber: string) =>
  `${STORAGE_PREFIX}:${hotelId}:${roomNumber}`

export const saveCustomerRoomReservationId = (
  hotelId: string,
  roomNumber: string,
  reservationId: string | number
) => {
  if (typeof window === 'undefined' || !hotelId || !roomNumber) return

  window.localStorage.setItem(getStorageKey(hotelId, roomNumber), String(reservationId))
}

export const getSavedCustomerRoomReservationId = (
  hotelId: string,
  roomNumber: string
) => {
  if (typeof window === 'undefined' || !hotelId || !roomNumber) return null

  const value = window.localStorage.getItem(getStorageKey(hotelId, roomNumber))
  const reservationId = Number(value)

  return Number.isFinite(reservationId) && reservationId > 0 ? reservationId : null
}

export const clearSavedCustomerRoomReservationId = (
  hotelId: string,
  roomNumber: string
) => {
  if (typeof window === 'undefined' || !hotelId || !roomNumber) return

  window.localStorage.removeItem(getStorageKey(hotelId, roomNumber))
}

import { RoomType, CreateRoomTypePayload, UpdateRoomTypePayload } from "../types/roomType"

let roomTypes: RoomType[] = [
  {
    id: '1',
    name: 'Standard Room',
    description: 'Comfortable room with essential amenities for a pleasant stay.',
    capacity: 2,
    dailyPrice: 80,
    monthlyPrice: 1800,
    weeklyPrice: 500,
    extendPrice: 90,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Deluxe Suite',
    description: 'Spacious suite with premium furnishings and stunning city view.',
    capacity: 4,
    dailyPrice: 200,
    monthlyPrice: 4000,
    weeklyPrice: 1200,
    extendPrice: 220,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Presidential Suite',
    description: 'Luxury suite with private pool and dedicated butler service.',
    capacity: 6,
    dailyPrice: 500,
    monthlyPrice: 10000,
    weeklyPrice: 3000,
    extendPrice: 540,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const roomTypesApi = {
  getAll: (): Promise<RoomType[]> =>
    Promise.resolve(roomTypes),

  getById: (id: string): Promise<RoomType | undefined> =>
    Promise.resolve(roomTypes.find(r => r.id === id)),

  create: (payload: CreateRoomTypePayload): Promise<RoomType> => {
    const newRoomType: RoomType = {
      ...payload,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    roomTypes = [...roomTypes, newRoomType]
    return Promise.resolve(newRoomType)
  },

  update: ({ id, ...rest }: UpdateRoomTypePayload): Promise<RoomType> => {
    roomTypes = roomTypes.map(r =>
      r.id === id ? { ...r, ...rest, updatedAt: new Date().toISOString() } : r
    )
    return Promise.resolve(roomTypes.find(r => r.id === id)!)
  },

  delete: (id: string): Promise<void> => {
    roomTypes = roomTypes.filter(r => r.id !== id)
    return Promise.resolve()
  },
}

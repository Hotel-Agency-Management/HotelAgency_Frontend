export interface RoomType {
  id: string
  hotelId: string
  name: string
  description: string
  capacity: number
  dailyPrice: number
  weeklyPrice: number
  monthlyPrice: number
  createdAt: string
  updatedAt: string
}

export type CreateRoomTypePayload = Omit<RoomType, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateRoomTypePayload = Partial<Omit<CreateRoomTypePayload, 'hotelId'>> & { id: string }

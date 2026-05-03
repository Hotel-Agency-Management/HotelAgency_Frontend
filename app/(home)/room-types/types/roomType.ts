export interface RoomType {
  id: string
  name: string
  description: string
  capacity: number
  dailyPrice: number
  weeklyPrice: number
  monthlyPrice: number
  extendPrice: number
  createdAt: string
  updatedAt: string
}

export type CreateRoomTypePayload = Omit<RoomType, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateRoomTypePayload = Partial<CreateRoomTypePayload> & { id: string }

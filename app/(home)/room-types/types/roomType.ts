export interface RoomType {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export type CreateRoomTypePayload = Pick<RoomType, 'name' | 'description'>
export type UpdateRoomTypePayload = Partial<CreateRoomTypePayload> & { id: number }

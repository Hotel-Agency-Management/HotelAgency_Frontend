export interface RoomType {
  id: number
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

export type CreateRoomTypePayload = Pick<
  RoomType,
  'name' | 'description' | 'capacity' | 'dailyPrice' | 'weeklyPrice' | 'monthlyPrice' | 'extendPrice'
>
export type UpdateRoomTypePayload = Partial<CreateRoomTypePayload> & { id: number }

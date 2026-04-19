import type { RoomAmenityIcon } from "../constants/roomAmenityIcons";

export interface RoomAmenity {
  id: string;
  title: string;
  icon: RoomAmenityIcon;
  createdAt: string;
  updatedAt: string;
}

export type CreateRoomAmenityDto = Pick<RoomAmenity, "title" | "icon">;

export type UpdateRoomAmenityDto = Partial<CreateRoomAmenityDto>;

export interface RoomAmenityFilters {
  search?: string;
}

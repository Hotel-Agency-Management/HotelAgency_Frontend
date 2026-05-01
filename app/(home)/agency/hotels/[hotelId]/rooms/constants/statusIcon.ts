import { RoomStatus } from "../types/room";

export const STATUS_ICONS: Record<RoomStatus, string> = {
  [RoomStatus.Available]: "tabler:circle-check",
  [RoomStatus.Occupied]: "tabler:user",
  [RoomStatus.Maintenance]: "tabler:tool",
  [RoomStatus.Reserved]: "tabler:calendar-event",
  [RoomStatus.OutOfService]: "tabler:ban",
};

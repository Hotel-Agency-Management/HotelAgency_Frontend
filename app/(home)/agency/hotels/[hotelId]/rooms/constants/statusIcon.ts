import { ROOM_STATUS, RoomStatus } from "../types/room";

export const STATUS_ICONS: Record<RoomStatus, string> = {
  [ROOM_STATUS.AVAILABLE]: "tabler:circle-check",
  [ROOM_STATUS.OCCUPIED]: "tabler:user",
  [ROOM_STATUS.MAINTENANCE]: "tabler:tool",
  [ROOM_STATUS.RESERVED]: "tabler:calendar-event",
  [ROOM_STATUS.BLOCKED]: "tabler:ban",
};

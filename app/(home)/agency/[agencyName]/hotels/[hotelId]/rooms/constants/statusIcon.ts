import { RoomStatus } from "../types/room";

export const STATUS_ICONS: Record<RoomStatus, string> = {
  available: "tabler:circle-check",
  occupied: "tabler:user",
  maintenance: "tabler:tool",
  reserved: "tabler:calendar-event",
  blocked: "tabler:ban",
};

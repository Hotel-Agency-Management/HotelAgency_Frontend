import { ROOM_STATUS, RoomStatus } from "../types/room";

export const ROOM_STATUSES: Record<RoomStatus, { label: string; color: "success" | "error" | "warning" | "info" | "default" }> = {
  [ROOM_STATUS.AVAILABLE]: { label: "Available", color: "success" },
  [ROOM_STATUS.OCCUPIED]: { label: "Occupied", color: "error" },
  [ROOM_STATUS.MAINTENANCE]: { label: "Maintenance", color: "warning" },
  [ROOM_STATUS.RESERVED]: { label: "Reserved", color: "info" },
  [ROOM_STATUS.BLOCKED]: { label: "Blocked", color: "default" },
};

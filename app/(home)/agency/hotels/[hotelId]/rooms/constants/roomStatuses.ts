import { ROOM_STATUS, RoomStatus } from "../types/room";

export const ROOM_STATUSES: Record<string, { label: string; color: "success" | "error" | "warning" | "info" | "default" }> = {
  [RoomStatus.Available]: { label: "Available", color: "success" },
  [RoomStatus.Occupied]: { label: "Occupied", color: "error" },
  [RoomStatus.Maintenance]: { label: "Maintenance", color: "warning" },
  [RoomStatus.Reserved]: { label: "Reserved", color: "info" },
  [RoomStatus.OutOfService]: { label: "Out of service", color: "default" },
  [ROOM_STATUS.AVAILABLE]: { label: "Available", color: "success" },
  [ROOM_STATUS.OCCUPIED]: { label: "Occupied", color: "error" },
  [ROOM_STATUS.MAINTENANCE]: { label: "Maintenance", color: "warning" },
  [ROOM_STATUS.RESERVED]: { label: "Reserved", color: "info" },
  [ROOM_STATUS.BLOCKED]: { label: "Blocked", color: "default" },
};

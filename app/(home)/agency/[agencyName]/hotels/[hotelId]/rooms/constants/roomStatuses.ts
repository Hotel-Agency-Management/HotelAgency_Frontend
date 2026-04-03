import { RoomStatus } from "../types/room";

export const ROOM_STATUSES: Record<RoomStatus, { label: string; color: "success" | "error" | "warning" | "info" | "default" }> = {
  available: { label: "Available", color: "success" },
  occupied: { label: "Occupied", color: "error" },
  maintenance: { label: "Maintenance", color: "warning" },
  reserved: { label: "Reserved", color: "info" },
  blocked: { label: "Blocked", color: "default" },
};

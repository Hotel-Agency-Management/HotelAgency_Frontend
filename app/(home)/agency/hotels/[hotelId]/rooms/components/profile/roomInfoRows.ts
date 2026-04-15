import type { TFunction } from "i18next";
import type { RoomProfile } from "./types";

export function buildRoomInfoRows(
  t: TFunction,
  locale: string,
  room: Pick<RoomProfile, "floorNumber" | "capacity" | "pricePerNight">,
  bedLabel: string,
): [string, string][] {
  const price =
    room.pricePerNight != null
      ? new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }).format(room.pricePerNight)
      : "—";
  return [
    [t("hotelRooms.profile.floor"), String(room.floorNumber)],
    [t("hotelRooms.profile.capacity"), String(room.capacity)],
    [t("hotelRooms.profile.bed"), bedLabel],
    [t("hotelRooms.profile.pricePerNight"), price],
  ];
}

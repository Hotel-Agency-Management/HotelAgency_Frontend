export type RoomKind =
  | "single"
  | "double"
  | "twin"
  | "suite"
  | "penthouse"
  | "studio";

export const ROOM_TYPES: Record<RoomKind, { label: string; icon: string }> = {
  single: { label: "Single", icon: "tabler:bed" },
  double: { label: "Double", icon: "tabler:bed-flat" },
  twin: { label: "Twin", icon: "tabler:bed" },
  suite: { label: "Suite", icon: "tabler:armchair" },
  penthouse: { label: "Penthouse", icon: "tabler:building-skyscraper" },
  studio: { label: "Studio", icon: "tabler:layout" },
};

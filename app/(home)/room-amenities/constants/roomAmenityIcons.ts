import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  Bath,
  BedDouble,
  BottleWine,
  BriefcaseBusiness,
  Building2,
  Car,
  Coffee,
  Dumbbell,
  Lock,
  ShowerHead,
  Sparkles,
  Tv,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";

export const ROOM_AMENITY_ICON_VALUES = [
  "wifi",
  "minibar",
  "balcony",
  "jacuzzi",
  "ac",
  "tv",
  "safe",
  "breakfast",
  "workspace",
  "coffee",
  "parking",
  "pool",
  "gym",
  "spa",
  "bed",
  "dining",
  "bathroom",
] as const;

export type RoomAmenityIcon = (typeof ROOM_AMENITY_ICON_VALUES)[number];

const ROOM_AMENITY_ICON_COMPONENTS: Record<RoomAmenityIcon, LucideIcon> = {
  wifi: Wifi,
  minibar: BottleWine,
  balcony: Building2,
  jacuzzi: Bath,
  ac: AirVent,
  tv: Tv,
  safe: Lock,
  breakfast: Coffee,
  workspace: BriefcaseBusiness,
  coffee: Coffee,
  parking: Car,
  pool: Waves,
  gym: Dumbbell,
  spa: Sparkles,
  bed: BedDouble,
  dining: Utensils,
  bathroom: ShowerHead,
};

export const ROOM_AMENITY_ICON_OPTIONS = ROOM_AMENITY_ICON_VALUES.map((value) => ({
  value,
  label: value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" "),
  Icon: ROOM_AMENITY_ICON_COMPONENTS[value],
}));

export function getRoomAmenityIcon(icon: RoomAmenityIcon | string): LucideIcon {
  return ROOM_AMENITY_ICON_COMPONENTS[icon as RoomAmenityIcon] ?? Sparkles;
}

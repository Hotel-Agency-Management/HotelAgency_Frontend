import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BED_TYPES } from "../../constants/bedTypes";
import { ROOM_TYPES } from "../../constants/roomTypes";
import type { RoomProfile } from "./types";
import { RoomInfoCardFilled } from "./RoomInfoCardFilled";
import { buildRoomInfoRows } from "./roomInfoRows";
import { RoomInfoCardSkeleton } from "./profileSkelton/RoomInfoCardSkeleton";

export interface RoomInfoCardProps {
  room: Pick<RoomProfile, "type" | "floorNumber" | "capacity" | "bedType" | "pricePerNight" | "starRating">;
  onEdit: () => void;
  onDelete: () => void;
  loading?: boolean;
}

export const RoomInfoCard = memo(function RoomInfoCard({
  room,
  onEdit,
  onDelete,
  loading,
}: RoomInfoCardProps) {
  const { t, i18n } = useTranslation();
  const bed = useMemo(
    () => BED_TYPES.find((b) => b.value === room.bedType)?.label ?? room.bedType,
    [room.bedType],
  );
  const rows = useMemo(
    () => buildRoomInfoRows(t, i18n.language, room, bed),
    [t, i18n.language, room, bed],
  );
  const tm = ROOM_TYPES[room.type];
  if (loading) return <RoomInfoCardSkeleton />;
  return (
    <RoomInfoCardFilled t={t} room={room} rows={rows} tm={tm} onEdit={onEdit} onDelete={onDelete} />
  );
});

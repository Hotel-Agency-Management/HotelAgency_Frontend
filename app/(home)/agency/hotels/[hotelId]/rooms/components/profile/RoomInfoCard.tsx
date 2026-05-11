import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { RoomResponse } from "../../types/room";
import { RoomInfoCardFilled } from "./RoomInfoCardFilled";
import { buildRoomInfoRows } from "./roomInfoRows";
import { RoomInfoCardSkeleton } from "./profileSkelton/RoomInfoCardSkeleton";

export interface RoomInfoCardProps {
  room: Pick<RoomResponse, "roomTypeName" | "floorNumber" | "capacity" | "dailyPrice" | "weeklyPrice" | "monthlyPrice" | "extendPrice" | "yearlyInsurance" | "insurancePerReservation">;
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
  const rows = useMemo(
    () => buildRoomInfoRows(t, i18n.language, room),
    [t, i18n.language, room],
  );
  if (loading) return <RoomInfoCardSkeleton />;
  return (
    <RoomInfoCardFilled t={t} roomTypeName={room.roomTypeName} rows={rows} onEdit={onEdit} onDelete={onDelete} />
  );
});

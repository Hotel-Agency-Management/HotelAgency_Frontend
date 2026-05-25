import { memo } from "react";
import Chip from "@mui/material/Chip";
import Icon from "@/components/icon/Icon";
import { getRoomStatusLabel, ROOM_STATUSES } from "../../constants/roomStatuses";
import type { LegacyRoomStatus, RoomStatus } from "../../types/room";
import { STATUS_ICONS } from "../../constants/statusIcon";
import { useTranslation } from "react-i18next";

export interface RoomStatusBadgeProps {
  status: RoomStatus | LegacyRoomStatus;
}

export const RoomStatusBadge = memo(function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
  const { t } = useTranslation();
  const { label, color } = ROOM_STATUSES[status] ?? { label: status, color: "default" as const };
  return (
    <Chip
      size="small"
      color={color}
      icon={<Icon icon={STATUS_ICONS[status as RoomStatus] ?? "tabler:circle"} fontSize="small" />}
      label={getRoomStatusLabel(t, status, label)}
    />
  );
});

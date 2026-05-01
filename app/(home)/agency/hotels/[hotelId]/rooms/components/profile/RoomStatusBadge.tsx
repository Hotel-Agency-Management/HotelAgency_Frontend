import { memo } from "react";
import Chip from "@mui/material/Chip";
import Icon from "@/components/icon/Icon";
import { ROOM_STATUSES } from "../../constants/roomStatuses";
import type { LegacyRoomStatus, RoomStatus } from "../../types/room";
import { STATUS_ICONS } from "../../constants/statusIcon";

export interface RoomStatusBadgeProps {
  status: RoomStatus | LegacyRoomStatus;
}

export const RoomStatusBadge = memo(function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
  const { label, color } = ROOM_STATUSES[status] ?? { label: status, color: "default" as const };
  return (
    <Chip
      size="small"
      color={color}
      icon={<Icon icon={STATUS_ICONS[status as RoomStatus] ?? "tabler:circle"} fontSize="small" />}
      label={label}
    />
  );
});

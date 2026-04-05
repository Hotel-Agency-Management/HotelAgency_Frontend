import { memo } from "react";
import Chip from "@mui/material/Chip";
import Icon from "@/components/icon/Icon";
import { ROOM_STATUSES } from "../../constants/roomStatuses";
import type { RoomStatus } from "../../types/room";
import { STATUS_ICONS } from "../../constants/statusIcon";

export interface RoomStatusBadgeProps {
  status: RoomStatus;
}

export const RoomStatusBadge = memo(function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
  const { label } = ROOM_STATUSES[status];
  return (
    <Chip
      size="small"
      variant={`status-${status}`}
      icon={<Icon icon={STATUS_ICONS[status]} fontSize="small" />}
      label={label}
    />
  );
});

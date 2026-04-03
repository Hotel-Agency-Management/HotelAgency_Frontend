import { Chip } from "@mui/material";
import { ROOM_STATUSES } from "../../../constants/roomStatuses";
import { RoomStatus } from "../../../types/room";

interface Props {
  status: RoomStatus;
}

export const RoomStatusChip = ({ status }: Props) => {
  const { label, color } = ROOM_STATUSES[status];
  return <Chip label={label} color={color} size="small" />;
};

import { Chip } from "@mui/material";
import { getRoomStatusLabel, ROOM_STATUSES } from "../../../constants/roomStatuses";
import { RoomStatus } from "../../../types/room";
import { useTranslation } from "react-i18next";

interface Props {
  status: RoomStatus;
}

export const RoomStatusChip = ({ status }: Props) => {
  const { t } = useTranslation();
  const { label, color } = ROOM_STATUSES[status] ?? { label: status, color: 'default' as const };
  return <Chip label={getRoomStatusLabel(t, status, label)} color={color} size="small" />;
};

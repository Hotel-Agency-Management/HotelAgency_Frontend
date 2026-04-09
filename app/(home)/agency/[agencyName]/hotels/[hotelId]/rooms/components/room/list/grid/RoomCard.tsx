import { Card, Stack } from "@mui/material";
import type { Room } from "../../../../types/room";
import { RoomCardActions } from "./RoomCardActions";
import { RoomCardImage } from "./RoomCardImage";
import { RoomCardInfo } from "./RoomCardInfo";

export interface RoomCardProps {
  room: Room;
  roomTypeName: string;
  currency: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRoomClick?: (id: string) => void;
}

export function RoomCard({
  room,
  roomTypeName,
  currency,
  onEdit,
  onDelete,
  onRoomClick,
}: RoomCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{ cursor: onRoomClick != null ? "pointer" : undefined }}
      onClick={onRoomClick != null ? () => onRoomClick(room.id) : undefined}
    >
      <Stack spacing={2}>
        <RoomCardImage photos={room.photos} title={room.roomNumber} />
        <Stack spacing={2} sx={{ px: 2, pb: 2 }}>
          <RoomCardInfo
            roomNumber={room.roomNumber}
            roomTypeName={roomTypeName}
            status={room.status}
            pricePerNight={room.pricePerNight}
            capacity={room.capacity}
            currency={currency}
          />
          <RoomCardActions roomId={room.id} onEdit={onEdit} onDelete={onDelete} />
        </Stack>
      </Stack>
    </Card>
  );
}

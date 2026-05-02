import { Stack } from "@mui/material";
import { resolveRoomImage } from "@/lib/image-url";
import type { RoomListItemResponse, RoomPhoto } from "../../../../types/room";
import { RoomCardContent, RoomCardRoot } from "../../../../StyledComponents";
import { RoomCardActions } from "./RoomCardActions";
import { RoomCardImage } from "./RoomCardImage";
import { RoomCardInfo } from "./RoomCardInfo";

export interface RoomCardProps {
  room: RoomListItemResponse;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onRoomClick?: (id: number) => void;
}

export function RoomCard({
  room,
  onEdit,
  onDelete,
  onRoomClick,
}: RoomCardProps) {
  const photos: RoomPhoto[] = room.coverPhotoUrl
    ? [{ id: `cover-${room.id}`, url: resolveRoomImage(room.coverPhotoUrl), isPrimary: true }]
    : [];

  return (
    <RoomCardRoot
      variant="outlined"
      clickable={onRoomClick != null}
      onClick={onRoomClick != null ? () => onRoomClick(room.id) : undefined}
    >
      <Stack spacing={2}>
        <RoomCardImage photos={photos} title={room.roomNumber} />
        <RoomCardContent spacing={2}>
          <RoomCardInfo
            roomNumber={room.roomNumber}
            roomTypeName={room.roomTypeName}
            floorNumber={room.floorNumber}
            status={room.status}
            pricePerNight={room.dailyPrice}
            capacity={room.capacity}
          />
          <RoomCardActions roomId={room.id} onEdit={onEdit} onDelete={onDelete} />
        </RoomCardContent>
      </Stack>
    </RoomCardRoot>
  );
}

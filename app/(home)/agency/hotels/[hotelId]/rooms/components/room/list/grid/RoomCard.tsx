import { Stack } from "@mui/material";
import { resolveRoomImage } from "@/lib/image-url";
import { useAdminRoomById } from "../../../../hooks/queries/adminRoomQueries";
import { useRoomById } from "../../../../hooks/queries/roomQueries";
import type { RoomListItemResponse, RoomPhoto, RoomRouteScope } from "../../../../types/room";
import { RoomCardContent, RoomCardRoot } from "../../../../roomStyle";
import { RoomCardActions } from "./RoomCardActions";
import { RoomCardImage } from "./RoomCardImage";
import { RoomCardInfo } from "./RoomCardInfo";

export interface RoomCardProps {
  room: RoomListItemResponse;
  scope: RoomRouteScope;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onRoomClick?: (id: number) => void;
}

export function RoomCard({
  room,
  scope,
  onEdit,
  onDelete,
  onRoomClick,
}: RoomCardProps) {
  const agencyRoom = useRoomById(scope.mode === "agency" ? scope.hotelId : undefined, room.roomId);
  const adminRoom = useAdminRoomById(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
    room.roomId,
  );
  const details = scope.mode === "admin" ? adminRoom.data : agencyRoom.data;
  const coverPhotoUrl = details?.coverPhotoUrl ?? room.mainPhotoUrl;
  const photos: RoomPhoto[] = coverPhotoUrl
    ? [{ id: `cover-${room.roomId}`, url: resolveRoomImage(coverPhotoUrl), isPrimary: true }]
    : [];

  return (
    <RoomCardRoot
      variant="outlined"
      clickable={onRoomClick != null}
      onClick={onRoomClick != null ? () => onRoomClick(room.roomId) : undefined}
    >
      <Stack spacing={2}>
        <RoomCardImage photos={photos} title={room.roomNumber} />
        <RoomCardContent spacing={2}>
          <RoomCardInfo
            roomNumber={room.roomNumber}
            roomTypeName={room.roomType}
            floorNumber={room.floorNumber}
            status={room.status}
            pricePerNight={details?.dailyPrice ?? room.pricePerNight}
            capacity={details?.capacity ?? room.capacity}
          />
          <RoomCardActions roomId={room.roomId} onEdit={onEdit} onDelete={onDelete} />
        </RoomCardContent>
      </Stack>
    </RoomCardRoot>
  );
}

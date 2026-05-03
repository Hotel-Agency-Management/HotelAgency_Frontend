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
  const agencyRoom = useRoomById(scope.mode === "agency" ? scope.hotelId : undefined, room.id);
  const adminRoom = useAdminRoomById(
    scope.mode === "admin" ? scope.agencyId : undefined,
    scope.mode === "admin" ? scope.hotelId : undefined,
    room.id,
  );
  const details = scope.mode === "admin" ? adminRoom.data : agencyRoom.data;
  const photos: RoomPhoto[] = details?.coverPhotoUrl
    ? [{ id: `cover-${details.id}`, url: resolveRoomImage(details.coverPhotoUrl), isPrimary: true }]
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
            pricePerNight={details?.dailyPrice}
            capacity={details?.capacity}
          />
          <RoomCardActions roomId={room.id} onEdit={onEdit} onDelete={onDelete} />
        </RoomCardContent>
      </Stack>
    </RoomCardRoot>
  );
}

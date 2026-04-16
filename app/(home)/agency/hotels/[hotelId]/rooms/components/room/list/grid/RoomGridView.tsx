import { CircularProgress, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { Room } from "../../../../types/room";
import type { RoomType } from "../../../../../../../../room-types/types/roomType";
import { RoomCard } from "./RoomCard";
import { RoomGridLoading } from "./roomGridViewStyles";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";

export interface RoomGridViewProps {
  rooms: Room[];
  roomTypes: RoomType[];
  isLoading: boolean;
  currency: string;
  onEditRoom: (id: string) => void;
  onDeleteRoom: (id: string) => void;
  onRoomClick?: (id: string) => void;
}

export function RoomGridView({
  rooms,
  roomTypes,
  isLoading,
  currency,
  onEditRoom,
  onDeleteRoom,
  onRoomClick,
}: RoomGridViewProps) {
  const { t } = useTranslation();
  const typeNameById = new Map(roomTypes.map((rt) => [rt.id, rt.name]));

  if (isLoading) {
    return (
      <RoomGridLoading>
        <CircularProgress disableShrink />
      </RoomGridLoading>
    );
  }

  if (rooms.length === 0) {
    return (
      <RoomGridLoading>
        <Typography color="text.secondary">
          {t("hotelRooms.grid.noRooms", "No rooms match your filters.")}
        </Typography>
      </RoomGridLoading>
    );
  }

  return (
    <StaggerGroup staggerDelay={0.06} direction="up" distance={20} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        {rooms.map((room) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room.id}>
            <StaggerItem>
              <RoomCard
                room={room}
                roomTypeName={typeNameById.get(room.roomTypeId) ?? "—"}
                currency={currency}
                onEdit={onEditRoom}
                onDelete={onDeleteRoom}
                onRoomClick={onRoomClick}
              />
            </StaggerItem>
          </Grid>
        ))}
      </Grid>
    </StaggerGroup>
  );
}

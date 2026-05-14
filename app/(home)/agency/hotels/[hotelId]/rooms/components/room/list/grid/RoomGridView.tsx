import { CircularProgress, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { RoomListItemResponse, RoomRouteScope } from "../../../../types/room";
import { RoomCard } from "./RoomCard";
import { RoomGridLoading } from "./roomGridViewStyles";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";

export interface RoomGridViewProps {
  rooms: RoomListItemResponse[];
  scope: RoomRouteScope;
  isLoading: boolean;
  onEditRoom: (id: number) => void;
  onDeleteRoom: (id: number) => void;
  onRoomClick?: (id: number) => void;
}

export function RoomGridView({
  rooms,
  scope,
  isLoading,
  onEditRoom,
  onDeleteRoom,
  onRoomClick,
}: RoomGridViewProps) {
  const { t } = useTranslation();

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
    <Grid container spacing={2} key={rooms.map((room) => room.roomId).join("-")}>
      {rooms.map((room) => (
        <Grid key={room.roomId} size={{ xs: 12, sm: 6, md: 4 }}>
          <StaggerGroup staggerDelay={0.06} distance={20}>
            <StaggerItem>
              <RoomCard
                room={room}
                scope={scope}
                onEdit={onEditRoom}
                onDelete={onDeleteRoom}
                onRoomClick={onRoomClick}
              />
            </StaggerItem>
          </StaggerGroup>
        </Grid>
      ))}
    </Grid>
  );
}

import { CircularProgress, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { RoomListItemResponse } from "../../../../types/room";
import { RoomCard } from "./RoomCard";
import { RoomGridLoading } from "./roomGridViewStyles";
import { StaggerItem } from "@/components/animation/StaggerGroup";
import { RoomGridStaggerGroup } from "../../../../StyledComponents";

export interface RoomGridViewProps {
  rooms: RoomListItemResponse[];
  isLoading: boolean;
  onEditRoom: (id: number) => void;
  onDeleteRoom: (id: number) => void;
  onRoomClick?: (id: number) => void;
}

export function RoomGridView({
  rooms,
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
    <RoomGridStaggerGroup staggerDelay={0.06} direction="up" distance={20}>
      <Grid container spacing={2}>
        {rooms.map((room) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room.id}>
            <StaggerItem>
              <RoomCard
                room={room}
                onEdit={onEditRoom}
                onDelete={onDeleteRoom}
                onRoomClick={onRoomClick}
              />
            </StaggerItem>
          </Grid>
        ))}
      </Grid>
    </RoomGridStaggerGroup>
  );
}

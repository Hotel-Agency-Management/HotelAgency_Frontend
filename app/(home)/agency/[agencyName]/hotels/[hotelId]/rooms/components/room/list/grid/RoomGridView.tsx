import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { Room } from "../../../../types/room";
import type { RoomType } from "../../../../types/roomType";
import { RoomCard } from "./RoomCard";
import { roomGridContainerSx, roomGridLoadingSx } from "./roomGridViewStyles";
import FadeIn from "@/components/animation/FadeIn";

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
      <Stack sx={roomGridLoadingSx}>
        <CircularProgress disableShrink />
      </Stack>
    );
  }

  if (rooms.length === 0) {
    return (
      <Stack sx={roomGridLoadingSx}>
        <Typography color="text.secondary">
          {t("hotelRooms.grid.noRooms", "No rooms match your filters.")}
        </Typography>
      </Stack>
    );
  }

  return (
    <Box sx={roomGridContainerSx}>
      {rooms.map((room, index) => (
        <FadeIn
          key={room.id}
          direction="up"
          distance={20}
          transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
        >
          <RoomCard
            room={room}
            roomTypeName={typeNameById.get(room.roomTypeId) ?? "—"}
            currency={currency}
            onEdit={onEditRoom}
            onDelete={onDeleteRoom}
            onRoomClick={onRoomClick}
          />
        </FadeIn>
      ))}
    </Box>
  );
}

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { RoomsToolbar } from "./RoomsToolbar";
import { RoomGridView } from "./grid/RoomGridView";
import { useRooms, useDeleteRoom } from "../../../hooks/useRoomStore";
import { RoomFilters } from "../../../types/room";
import { getRoomGridColumns } from "../../../util/roomGridColumns";
import { useRoomTypes } from "../../../../../../../room-types/hooks/uesRoomType";
import { useHotelStore } from "../../../../../hooks/useHotelStore";

interface Props {
  onAddRoom: () => void;
  onEditRoom: (id: string) => void;
}

export const RoomCardsView = ({ onAddRoom, onEditRoom }: Props) => {
  const router = useRouter();
  const params = useParams();
  const hotelId = params.hotelId as string;

  const [filters, setFilters] = useState<RoomFilters>({});
  const [view, setView] = useState<"list" | "cards">("list");

  const { data: rooms = [], isLoading } = useRooms(filters);
  const { mutate: deleteRoom } = useDeleteRoom();
  const { data: roomTypes = [] } = useRoomTypes();

  const hotel = useHotelStore((state) => state.getHotelById(hotelId));
  const currency = hotel?.basicInfo.currency ?? "USD";

  const columns = getRoomGridColumns(onEditRoom, deleteRoom, roomTypes);

  const goToRoomProfile = (roomId: string) => {
    router.push(`/agency/hotels/${hotelId}/rooms/${roomId}`);
  };

  return (
    <Stack spacing={2}>
      <RoomsToolbar
        filters={filters}
        roomTypes={roomTypes}
        onFilterChange={setFilters}
        onAddRoom={onAddRoom}
        view={view}
        onViewChange={setView}
      />
      {view === "cards" ? (
        <RoomGridView
          rooms={rooms}
          roomTypes={roomTypes}
          isLoading={isLoading}
          currency={currency}
          onEditRoom={onEditRoom}
          onDeleteRoom={deleteRoom}
          onRoomClick={goToRoomProfile}
        />
      ) : (
        <DataGrid
          rows={rooms}
          columns={columns}
          loading={isLoading}
          onRowClick={(p) => goToRoomProfile(String(p.id))}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
          sx={{ cursor: "pointer" }}
        />
      )}
    </Stack>
  );
};

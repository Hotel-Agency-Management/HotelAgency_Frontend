import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { DataGrid } from "@mui/x-data-grid";
import { RoomsToolbar } from "./RoomsToolbar";
import { useRooms, useDeleteRoom } from "../../../hooks/useRoomStore";
import { RoomFilters } from "../../../types/room";
import { getRoomGridColumns } from "../../../util/roomGridColumns";
import { useRoomTypes } from "../../../hooks/uesRoomType";

interface Props {
  onAddRoom: () => void;
  onEditRoom: (id: string) => void;
}

export const RoomsDataGrid = ({ onAddRoom, onEditRoom }: Props) => {
  const router = useRouter();
  const params = useParams();
  const hotelId = params.hotelId as string;
  const agencyName = params.agencyName as string;

  const [filters, setFilters] = useState<RoomFilters>({});
  const { data: rooms = [], isLoading } = useRooms(filters);
  const { mutate: deleteRoom } = useDeleteRoom();
  const { data: roomTypes = [] } = useRoomTypes(hotelId);

  const columns = getRoomGridColumns(onEditRoom, deleteRoom, roomTypes);

  return (
    <>
      <RoomsToolbar
        filters={filters}
        roomTypes={roomTypes}
        onFilterChange={setFilters}
        onAddRoom={onAddRoom}
      />

      <DataGrid
        rows={rooms}
        columns={columns}
        loading={isLoading}
        onRowClick={(p) =>
          router.push(`/agency/${agencyName}/hotels/${hotelId}/rooms/${String(p.id)}`)
        }
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        sx={{ cursor: "pointer" }}
      />
    </>
  );
};

import { useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { DeleteRoomDialog } from "../DeleteRoomDialog";
import { RoomRowsGrid } from "../../../StyledComponents";
import { RoomsToolbar } from "./RoomsToolbar";
import { RoomGridView } from "./grid/RoomGridView";
import type { RoomRouteScope } from "../../../types/room";
import { useRoomsPageController } from "../../../hooks/useRoomsPageController";
import { getRoomGridColumns } from "../../../util/roomGridColumns";

interface Props {
  scope: RoomRouteScope;
  onAddRoom: () => void;
  onEditRoom: (id: number) => void;
}

export const RoomCardsView = ({ scope, onAddRoom, onEditRoom }: Props) => {
  const controller = useRoomsPageController(scope);
  const [deleteRoomId, setDeleteRoomId] = useState<number | null>(null);

  const roomToDelete = useMemo(
    () => controller.rooms.find((room) => room.id === deleteRoomId),
    [controller.rooms, deleteRoomId],
  );

  const openDeleteDialog = (roomId: number) => {
    setDeleteRoomId(roomId);
  };

  const closeDeleteDialog = () => {
    if (!controller.isDeleting) setDeleteRoomId(null);
  };

  const confirmDelete = () => {
    if (deleteRoomId == null) return;
    controller.deleteRoom(deleteRoomId, { onSuccess: () => setDeleteRoomId(null) });
  };

  const columns = getRoomGridColumns(onEditRoom, openDeleteDialog);

  return (
    <Stack spacing={2}>
      <RoomsToolbar
        filters={controller.filters}
        onFilterChange={controller.setFilters}
        onAddRoom={onAddRoom}
        view={controller.view}
        onViewChange={controller.setView}
      />
      {controller.view === "cards" ? (
        <RoomGridView
          rooms={controller.rooms}
          isLoading={controller.isLoading}
          onEditRoom={onEditRoom}
          onDeleteRoom={openDeleteDialog}
          onRoomClick={controller.goToRoomProfile}
        />
      ) : (
        <RoomRowsGrid
          rows={controller.rooms}
          columns={columns}
          loading={controller.isLoading}
          onRowClick={(p) => controller.goToRoomProfile(Number(p.id))}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      )}

      <DeleteRoomDialog
        open={deleteRoomId != null}
        roomNumber={roomToDelete?.roomNumber}
        isDeleting={controller.isDeleting}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Stack>
  );
};

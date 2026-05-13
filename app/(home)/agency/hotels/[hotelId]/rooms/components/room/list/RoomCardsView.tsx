import { useMemo, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { DeleteRoomDialog } from "../DeleteRoomDialog";
import { RoomRowsGrid } from "../../../roomStyle";
import { RoomsToolbar } from "./RoomsToolbar";
import { RoomGridView } from "./grid/RoomGridView";
import type { RoomRouteScope } from "../../../types/room";
import { ROOM_PAGE_SIZE_OPTIONS } from "../../../constants/pagination";
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
    () => controller.rooms.find((room) => room.roomId === deleteRoomId),
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

  const totalPages = Math.ceil(controller.totalCount / controller.paginationModel.pageSize);

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
        <>
          <RoomGridView
            rooms={controller.rooms}
            scope={scope}
            isLoading={controller.isLoading}
            onEditRoom={onEditRoom}
            onDeleteRoom={openDeleteDialog}
            onRoomClick={controller.goToRoomProfile}
          />
          {totalPages > 1 && (
            <Stack alignItems="center">
              <Pagination
                count={totalPages}
                page={controller.paginationModel.page + 1}
                onChange={(_, p) =>
                  controller.handlePaginationModelChange({
                    ...controller.paginationModel,
                    page: p - 1,
                  })
                }
                color="primary"
                shape="rounded"
              />
            </Stack>
          )}
        </>
      ) : (
        <RoomRowsGrid
          paginationMode="server"
          rowCount={controller.totalCount}
          paginationModel={controller.paginationModel}
          onPaginationModelChange={controller.handlePaginationModelChange}
          getRowId={(row) => row.roomId}
          rows={controller.rooms}
          columns={columns}
          loading={controller.isLoading}
          onRowClick={(p) => controller.goToRoomProfile(Number(p.id))}
          pageSizeOptions={ROOM_PAGE_SIZE_OPTIONS}
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

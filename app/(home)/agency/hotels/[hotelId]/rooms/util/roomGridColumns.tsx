import { GridColDef } from "@mui/x-data-grid";
import { RoomStatusChip } from "../components/room/list/RoomStatusChip";
import { RoomQuickActions } from "../components/room/list/RoomQuickActions";
import { RoomType } from "../../../../../room-types/types/roomType";

export const getRoomGridColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
  roomTypes: RoomType[]
): GridColDef[] => {
  const typeNameById = new Map(roomTypes.map((rt) => [String(rt.id), rt.name]));

  return [
  { field: "roomNumber", headerName: "Room #", flex: 0.8, minWidth: 80 },
  { field: "floorNumber", headerName: "Floor", flex: 0.6, minWidth: 70 },
  {
    field: "roomTypeId",
    headerName: "Type",
    flex: 1,
    minWidth: 120,
    valueGetter: (_value, row) =>
      typeNameById.get(row.roomTypeId as string) ?? "—",
  },
  { field: "capacity", headerName: "Capacity", flex: 0.7, minWidth: 80 },
  {
    field: "status",
    headerName: "Status",
    flex: 1.2,
    minWidth: 120,
    renderCell: (params) => <RoomStatusChip status={params.value} />,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 0.8,
    minWidth: 90,
    sortable: false,
    renderCell: (params) => (
      <RoomQuickActions
        id={params.row.id}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
};

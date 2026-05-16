import { GridColDef } from "@mui/x-data-grid";
import { RoomStatusChip } from "../components/room/list/RoomStatusChip";
import { RoomQuickActions } from "../components/room/list/RoomQuickActions";

export const getRoomGridColumns = (
  onEdit: (id: number) => void,
  onDelete: (id: number) => void
): GridColDef[] => {
  return [
  { field: "roomNumber", headerName: "Room #", flex: 0.8, minWidth: 80 },
  { field: "capacity", headerName: "Capacity", flex: 0.6, minWidth: 70 },
  {
    field: "roomType",
    headerName: "Type",
    flex: 1,
    minWidth: 120,
  },
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
        id={Number(params.row.roomId)}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
};

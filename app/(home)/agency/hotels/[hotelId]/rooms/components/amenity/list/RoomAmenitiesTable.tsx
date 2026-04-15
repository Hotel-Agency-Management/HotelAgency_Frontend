import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { RoomAmenity } from "../../../types/roomAmenity";
import { getRoomAmenityGridColumns } from "../../../util/roomAmenityGridColumns";

interface Props {
  amenities: RoomAmenity[];
  isLoading: boolean;
  onEdit: (amenity: RoomAmenity) => void;
  onDelete: (amenity: RoomAmenity) => void;
  onAssign: (amenity: RoomAmenity) => void;
}

export function RoomAmenitiesTable({
  amenities,
  isLoading,
  onEdit,
  onDelete,
  onAssign,
}: Props) {
  const columns = useMemo(
    () => getRoomAmenityGridColumns({ onEdit, onDelete, onAssign }),
    [onAssign, onDelete, onEdit]
  );

  return (
    <DataGrid
      rows={amenities}
      columns={columns}
      loading={isLoading}
      pageSizeOptions={[10, 25, 50]}
      disableRowSelectionOnClick
      getRowHeight={() => 72}
    />
  );
}

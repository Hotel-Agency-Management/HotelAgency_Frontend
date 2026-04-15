import { useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { useDeleteFacility, useFacilities } from "../../hooks/useFacilityStore";
import type { FacilityFilters, HotelFacility } from "../../types/facility";
import { getFacilityGridColumns } from "../../utils/facilityGridColumns";
import { DeleteFacilityDialog } from "./DeleteFacilityDialog";
import { FacilitiesToolbar } from "./FacilitiesToolbar";
import { FacilityGridView } from "./grid/FacilityGridView";

interface Props {
  hotelId: string;
  onEditFacility: (id: string) => void;
}

export function FacilitiesView({ hotelId, onEditFacility }: Props) {
  const [filters, setFilters] = useState<FacilityFilters>({});
  const [view, setView] = useState<"list" | "cards">("list");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const { data: facilities = [], isLoading } = useFacilities(hotelId, filters);
  const { mutate: deleteFacility, isPending: isDeleting } = useDeleteFacility();

  const deleteTarget = useMemo<HotelFacility | null>(
    () => facilities.find((facility) => facility.id === deleteTargetId) ?? null,
    [deleteTargetId, facilities]
  );

  const columns = useMemo(
    () =>
      getFacilityGridColumns({
        onEdit: onEditFacility,
        onDelete: setDeleteTargetId,
      }),
    [onEditFacility]
  );

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;

    deleteFacility(deleteTargetId, {
      onSuccess: () => setDeleteTargetId(null),
    });
  };

  return (
    <Stack spacing={2}>
      <FacilitiesToolbar
        filters={filters}
        view={view}
        onFilterChange={setFilters}
        onViewChange={setView}
      />

      {view === "cards" ? (
        <FacilityGridView
          facilities={facilities}
          isLoading={isLoading}
          onEditFacility={onEditFacility}
          onDeleteFacility={setDeleteTargetId}
        />
      ) : (
        <DataGrid
          rows={facilities}
          columns={columns}
          loading={isLoading}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      )}

      <DeleteFacilityDialog
        open={deleteTargetId != null}
        facility={deleteTarget}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </Stack>
  );
}

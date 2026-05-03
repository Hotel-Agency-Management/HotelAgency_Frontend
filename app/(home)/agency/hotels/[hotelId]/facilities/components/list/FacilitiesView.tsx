import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { useFacilitiesView } from "../../hooks/useFacilitiesView";
import { DeleteFacilityDialog } from "./DeleteFacilityDialog";
import { FacilitiesToolbar } from "./FacilitiesToolbar";
import { FacilityGridView } from "./grid/FacilityGridView";

interface Props {
  hotelId: string;
  agencyId?: string;
  onEditFacility: (id: string) => void;
}

export function FacilitiesView({ hotelId, agencyId, onEditFacility }: Props) {
  const {
    filters,
    setFilters,
    view,
    setView,
    facilities,
    isLoading,
    columns,
    deleteTarget,
    isDeleting,
    setDeleteTargetId,
    closeDeleteDialog,
    confirmDeleteFacility,
  } = useFacilitiesView({ hotelId, agencyId, onEditFacility });

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
        open={deleteTarget != null}
        facility={deleteTarget}
        onClose={closeDeleteDialog}
        onConfirm={confirmDeleteFacility}
        isDeleting={isDeleting}
      />
    </Stack>
  );
}

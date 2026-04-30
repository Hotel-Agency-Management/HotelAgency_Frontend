import { useMemo, useState } from "react";
import {
  useDeleteFacility,
  useDeleteAdminFacility,
} from "./mutations/facilityMutations";
import { useFacilityScope } from "./useFacilityScope";
import { useFacilities } from "./useFacilityStore";
import type { FacilityFilters, HotelFacility } from "../types/facility";
import { getFacilityGridColumns } from "../utils/facilityGridColumns";
import { toNumericId } from "../utils/numericId";

interface UseFacilitiesViewArgs {
  hotelId: string;
  agencyId?: string;
  onEditFacility: (id: string) => void;
}

export function useFacilitiesView({
  hotelId,
  agencyId,
  onEditFacility,
}: UseFacilitiesViewArgs) {
  const [filters, setFilters] = useState<FacilityFilters>({});
  const [view, setView] = useState<"list" | "cards">("list");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const scope = useFacilityScope(hotelId, agencyId);
  const { data: facilities = [], isLoading } = useFacilities(hotelId, agencyId);
  const { mutate: deleteFacility, isPending: isDeleting } = useDeleteFacility();
  const { mutate: deleteAdminFacility, isPending: isDeletingAdmin } =
    useDeleteAdminFacility();

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

  const closeDeleteDialog = () => setDeleteTargetId(null);

  const confirmDeleteFacility = () => {
    if (!deleteTargetId) return;
    const facilityId = toNumericId(deleteTargetId);
    if (!scope.hotelId || !facilityId) return;
    const hotelIdNumber = scope.hotelId;

    const onSuccess = () => setDeleteTargetId(null);

    if (scope.type === "admin") {
      deleteAdminFacility(
        {
          agencyId: scope.agencyId,
          hotelId: hotelIdNumber,
          facilityId,
        },
        { onSuccess }
      );
      return;
    }

    deleteFacility(
      {
        hotelId: hotelIdNumber,
        facilityId,
      },
      { onSuccess }
    );
  };

  return {
    filters,
    setFilters,
    view,
    setView,
    facilities,
    isLoading,
    columns,
    deleteTarget,
    isDeleting: isDeleting || isDeletingAdmin,
    setDeleteTargetId,
    closeDeleteDialog,
    confirmDeleteFacility,
  };
}

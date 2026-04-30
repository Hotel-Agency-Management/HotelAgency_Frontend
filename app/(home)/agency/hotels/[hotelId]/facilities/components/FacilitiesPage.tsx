"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import { useParams } from "next/navigation";
import { useFacility } from "../hooks/useFacilityStore";
import { FacilitiesPageHeader } from "./FacilitiesPageHeader";
import { FacilityFormDialog } from "./form/FacilityFormDialog";
import { FacilitiesView } from "./list/FacilitiesView";

function getRouteParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function FacilitiesPage() {
  const params = useParams();
  const hotelId = getRouteParam(params.hotelId);
  const agencyId = getRouteParam(params.agencyId);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  const { data: selectedFacility, isLoading: selectedFacilityLoading } = useFacility(
    selectedFacilityId ?? "",
    hotelId,
    agencyId
  );

  const openAddDialog = () => {
    setSelectedFacilityId(null);
    setDialogOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedFacilityId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedFacilityId(null);
  };

  return (
    <Stack spacing={3}>
      <FacilitiesPageHeader onOpenAddDialog={openAddDialog} />
      <FacilitiesView
        hotelId={hotelId ?? ""}
        agencyId={agencyId}
        onEditFacility={handleEdit}
      />
      <FacilityFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        facilityId={selectedFacilityId}
        facility={selectedFacility ?? null}
        isLoading={selectedFacilityLoading}
        hotelId={hotelId ?? ""}
        agencyId={agencyId}
      />
    </Stack>
  );
}

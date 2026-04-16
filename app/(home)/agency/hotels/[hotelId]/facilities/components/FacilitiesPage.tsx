"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import { useParams } from "next/navigation";
import { useFacility } from "../hooks/useFacilityStore";
import { FacilitiesPageHeader } from "./FacilitiesPageHeader";
import { FacilityFormDialog } from "./form/FacilityFormDialog";
import { FacilitiesView } from "./list/FacilitiesView";

export function FacilitiesPage() {
  const params = useParams();
  const hotelId = params.hotelId as string;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);

  const { data: selectedFacility, isLoading: selectedFacilityLoading } = useFacility(
    selectedFacilityId ?? "",
    hotelId
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
      <FacilitiesView hotelId={hotelId} onEditFacility={handleEdit} />
      <FacilityFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        facilityId={selectedFacilityId}
        facility={selectedFacility ?? null}
        isLoading={selectedFacilityLoading}
        hotelId={hotelId}
      />
    </Stack>
  );
}

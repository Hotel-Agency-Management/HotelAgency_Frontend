"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Can from "@/components/ability/Can";
import { useHotelTermsEditor } from "../hooks/useHotelTermsEditor";
import { useHotelTermsForm } from "../hooks/useHotelTermsForm";
import {
  useDeleteHotelTerms,
  useUpsertHotelTerms,
} from "../hooks/useHotelTermsMutations";
import { useHotelTerms } from "../hooks/useHotelTermsQueries";
import { DeleteHotelTermsDialog } from "./DeleteHotelTermsDialog";
import { HotelTermsEmptyState } from "./HotelTermsEmptyState";
import { HotelTermsFormCard } from "./HotelTermsFormCard";
import { HotelTermsLoadingState } from "./HotelTermsLoadingState";
import { HotelTermsOverviewCard } from "./HotelTermsOverviewCard";

interface HotelTermsSettingsViewProps {
  hotelId: string;
  hotelName: string;
}

export function HotelTermsSettingsView({
  hotelId,
  hotelName,
}: HotelTermsSettingsViewProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const {
    data: terms,
    isLoading,
    error,
  } = useHotelTerms(hotelId);
  const resolvedTerms = terms ?? null;
  const { mutateAsync: upsertTerms } = useUpsertHotelTerms();
  const { mutateAsync: deleteTerms, isPending: isDeleting } = useDeleteHotelTerms();
  const form = useHotelTermsForm(resolvedTerms);
  const {
    isEditing,
    isSaving,
    handleEdit,
    handleCancel,
    handleSave,
  } = useHotelTermsEditor({
    form,
    terms: resolvedTerms,
    onSave: values =>
      upsertTerms({
        hotelId,
        ...values,
      }).then(() => undefined),
  });
  const handleOpenDeleteDialog = () => {
    if (!resolvedTerms) {
      return;
    }

    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    if (isDeleting) {
      return;
    }
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    await deleteTerms(hotelId);
    setIsDeleteDialogOpen(false);
  };

  if (isLoading) {
    return <HotelTermsLoadingState />;
  }

  if (error) {
    return <Alert severity="error">Failed to load Terms & Conditions.</Alert>;
  }

  return (
    <>
      <Can do="manage" this="HotelTerms">
        <Stack spacing={3}>
          <Stack spacing={0.75}>
            <Typography variant="h5">Terms & Conditions</Typography>
          </Stack>

          {!resolvedTerms ? <HotelTermsEmptyState hotelName={hotelName} /> : null}

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <HotelTermsFormCard
                form={form}
                terms={resolvedTerms}
                isEditing={isEditing}
                isSaving={isSaving}
                isDeleting={isDeleting}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onSave={handleSave}
                onDelete={handleOpenDeleteDialog}
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <HotelTermsOverviewCard hotelName={hotelName} terms={resolvedTerms} />
            </Grid>
          </Grid>

          <DeleteHotelTermsDialog
            open={isDeleteDialogOpen}
            hotelName={hotelName}
            isDeleting={isDeleting}
            onClose={handleCloseDeleteDialog}
            onConfirm={handleDelete}
          />
        </Stack>
      </Can>

      <Can do="manage" this="HotelTerms" not>
        <Alert severity="error">
          You do not have permission to manage Terms & Conditions for this hotel.
        </Alert>
      </Can>
    </>
  );
}

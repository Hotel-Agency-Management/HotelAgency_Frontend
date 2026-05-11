"use client";

import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Can from "@/components/ability/Can";
import { useHotelTermsSettingsView } from "../hooks/useHotelTermsSettingsView";
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
  const {
    resolvedTerms,
    isLoading,
    error,
    form,
    isEditing,
    isSaving,
    isDeleteDialogOpen,
    handleEdit,
    handleCancel,
    handleSave,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleDelete,
  } = useHotelTermsSettingsView(hotelId);

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
                isDeleting={false}
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
            isDeleting={false}
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

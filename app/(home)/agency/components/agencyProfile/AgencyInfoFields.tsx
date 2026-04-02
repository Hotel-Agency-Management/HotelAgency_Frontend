"use client";

import { Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { MuiTelInput } from "mui-tel-input";
import { AgencyInfoFieldsProps } from "../../types/agencyProfile";
import { FieldRow } from "./FieldRow";
import TextField from "@mui/material/TextField";


export function AgencyInfoFields({
  isEditing,
  isLoading,
  control,
  currentValues,
}: AgencyInfoFieldsProps) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FieldRow
          label="Agency Name"
          isEditing={isEditing}
          isLoading={isLoading}
          viewContent={
            <Typography variant="body1">
              {currentValues.name || "—"}
            </Typography>
          }
          editContent={
            <Controller
              name="name"
              control={control}
              rules={{ required: "Agency name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  placeholder="Enter agency name"
                />
              )}
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FieldRow
          label="Phone"
          isEditing={isEditing}
          isLoading={isLoading}
          viewContent={
            <Typography variant="body1">
              {currentValues.phone || "—"}
            </Typography>
          }
          editContent={
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field, fieldState }) => (
                <MuiTelInput
                  {...field}
                  fullWidth
                  size="small"
                  defaultCountry="US"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <FieldRow
          label="City"
          isEditing={isEditing}
          isLoading={isLoading}
          viewContent={
            <Typography variant="body1">
              {currentValues.city || "—"}
            </Typography>
          }
          editContent={
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  placeholder="Enter city"
                />
              )}
            />
          }
        />
      </Grid>
    </Grid>
  );
}

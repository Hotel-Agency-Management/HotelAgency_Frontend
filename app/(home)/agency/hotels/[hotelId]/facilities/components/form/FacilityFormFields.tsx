import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { FACILITY_STATUSES } from "../../constants/facilityStatuses";
import { FACILITY_TYPES } from "../../constants/facilityTypes";
import type { FacilityFormValues } from "../../schema/facilitySchema";
import type { FacilityStatus } from "../../types/facility";

export function FacilityFormFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FacilityFormValues>();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Facility name"
          fullWidth
          size="small"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="facilityType"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Facility type"
              fullWidth
              size="small"
              {...field}
              value={field.value ?? ""}
              error={!!errors.facilityType}
              helperText={errors.facilityType?.message}
            >
              {FACILITY_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Status"
              fullWidth
              size="small"
              {...field}
              value={field.value ?? ""}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              {Object.entries(FACILITY_STATUSES).map(([value, { label }]) => (
                <MenuItem key={value} value={value as FacilityStatus}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label="Open at"
          type="time"
          fullWidth
          size="small"
          inputProps={{ step: 1 }}
          {...register("openAt")}
          error={!!errors.openAt}
          helperText={errors.openAt?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label="Close at"
          type="time"
          fullWidth
          size="small"
          inputProps={{ step: 1 }}
          {...register("closeAt")}
          error={!!errors.closeAt}
          helperText={errors.closeAt?.message}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          label="Description"
          fullWidth
          size="small"
          multiline
          rows={3}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Grid>
    </Grid>
  );
}

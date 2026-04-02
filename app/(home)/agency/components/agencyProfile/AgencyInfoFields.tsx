"use client";
import { Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { MuiTelInput } from "mui-tel-input";
import { Building2, MapPin, Phone } from "lucide-react";
import { AgencyInfoFieldsProps } from "../../types/agencyProfile";
import TextField from "@mui/material/TextField";
import { FieldLabel } from "./FieldLabel";
function InfoCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: 2.5,
        bgcolor: theme => alpha(theme.palette.background.default, 0.35),
      }}
    >
      <Stack spacing={1.75} sx={{ p: 2.25, minHeight: 132 }}>
        {children}
      </Stack>
    </Paper>
  );
}

export function AgencyInfoFields({
  isEditing,
  isLoading,
  control,
  currentValues,
}: AgencyInfoFieldsProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 4 }}>
        <InfoCard>
          <FieldLabel icon={<Building2 size={15} />} text="Agency Name" />
          {isLoading ? (
            <Skeleton variant="text" width="72%" height={38} />
          ) : isEditing ? (
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
          ) : (
            <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.35 }}>
              {currentValues.name || "—"}
            </Typography>
          )}
        </InfoCard>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InfoCard>
          <FieldLabel icon={<Phone size={15} />} text="Phone" />
          {isLoading ? (
            <Skeleton variant="text" width="68%" height={38} />
          ) : isEditing ? (
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
          ) : (
            <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.35 }}>
              {currentValues.phone || "—"}
            </Typography>
          )}
        </InfoCard>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InfoCard>
          <FieldLabel icon={<MapPin size={15} />} text="City" />
          {isLoading ? (
            <Skeleton variant="text" width="55%" height={38} />
          ) : isEditing ? (
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
          ) : (
            <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.35 }}>
              {currentValues.city || "—"}
            </Typography>
          )}
        </InfoCard>
      </Grid>
    </Grid>
  );
}

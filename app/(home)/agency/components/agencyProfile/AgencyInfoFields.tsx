"use client";
import { Controller } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MuiTelInput } from "mui-tel-input";
import { Building2, MapPin, Phone, Tag } from "lucide-react";
import { AgencyInfoFieldsProps } from "../../types/agencyProfile";
import TextField from "@mui/material/TextField";
import { FieldLabel } from "./FieldLabel";
import { getCountryName } from "../../util/phoneUtils";
import { InfoCard } from "./InfoCard";
import { useGetSubscriptionPlans } from "@/app/(home)/subscription-plans/hooks/queries/usePlanQueries";

export function AgencyInfoFields({
  isEditing,
  isLoading,
  control,
  setValue,
  currentValues,
}: AgencyInfoFieldsProps) {
  const { data: plans = [], isLoading: isPlansLoading } = useGetSubscriptionPlans()
  const currentPlanName = plans.find(p => p.id === currentValues.planId)?.name

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3 }}>
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

      <Grid size={{ xs: 12, md: 3 }}>
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
                  onChange={(value, info) => {
                    field.onChange(value);

                    const countryName = getCountryName(info);
                    if (countryName) {
                      setValue("country", countryName, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }
                  }}
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

      <Grid size={{ xs: 12, md: 3 }}>
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

      <Grid size={{ xs: 12, md: 3 }}>
        <InfoCard>
          <FieldLabel icon={<Tag size={15} />} text="Subscription Plan" />
          {isLoading || isPlansLoading ? (
            <Skeleton variant="text" width="60%" height={38} />
          ) : isEditing ? (
            <Controller
              name="planId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <Select {...field} value={field.value ?? ''} displayEmpty>
                    <MenuItem value="" disabled>Select a plan</MenuItem>
                    {plans.map(plan => (
                      <MenuItem key={plan.id} value={plan.id}>{plan.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          ) : (
            <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.35 }}>
              {currentPlanName || "—"}
            </Typography>
          )}
        </InfoCard>
      </Grid>
    </Grid>
  );
}

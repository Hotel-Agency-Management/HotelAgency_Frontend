"use client";

import { Controller, type Control, type UseFormSetValue } from "react-hook-form";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { MuiTelInput } from "mui-tel-input";
import { Hotel, MapPin, Phone, Wallet, MapPinned } from "lucide-react";
import { CURRENCIES } from "../../constants/currencies";
import type { HotelFormValues } from "../../types/hotel";
import { getCountryNameFromPhoneCountry } from "../../utils/phoneCountry";
import { FormField } from "./FormField";

interface HotelInfoFieldsProps {
  isEditing: boolean;
  isLoading?: boolean;
  control: Control<HotelFormValues>;
  setValue: UseFormSetValue<HotelFormValues>;
  currentValues: HotelFormValues;
}

export function HotelInfoFields({
  isEditing,
  isLoading = false,
  control,
  setValue,
  currentValues,
}: HotelInfoFieldsProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormField
          icon={<Hotel size={15} />}
          label="Hotel Name"
          isEditing={isEditing}
          isLoading={isLoading}
          value={currentValues.basicInfo.name}
        >
          <Controller
            name="basicInfo.name"
            control={control}
            rules={{ required: "Hotel name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="Enter hotel name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </FormField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormField
          icon={<Phone size={15} />}
          label="Phone"
          isEditing={isEditing}
          isLoading={isLoading}
          value={currentValues.basicInfo.phone}
        >
          <Controller
            name="basicInfo.phone"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field, fieldState }) => (
              <MuiTelInput
                {...field}
                fullWidth
                size="small"
                label="Phone"
                defaultCountry="US"
                onChange={(value, info) => {
                  field.onChange(value);
                  setValue(
                    "basicInfo.country",
                    getCountryNameFromPhoneCountry(info.countryCode),
                    { shouldDirty: true }
                  );
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </FormField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormField
          icon={<MapPin size={15} />}
          label="City"
          isEditing={isEditing}
          isLoading={isLoading}
          value={currentValues.basicInfo.city}
        >
          <Controller
            name="basicInfo.city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="Enter city"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </FormField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <FormField
          icon={<Wallet size={15} />}
          label="Currency"
          isEditing={isEditing}
          isLoading={isLoading}
          value={currentValues.basicInfo.currency}
        >
          <Controller
            name="basicInfo.currency"
            control={control}
            rules={{ required: "Currency is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {CURRENCIES.map(({ code, label }) => (
                  <MenuItem key={code} value={code}>
                    {code} - {label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </FormField>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <FormField
          icon={<MapPinned size={15} />}
          label="Address"
          isEditing={isEditing}
          isLoading={isLoading}
          value={currentValues.basicInfo.address}
          fullHeight={false}
        >
          <Controller
            name="basicInfo.address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                multiline
                minRows={2}
                placeholder="Enter hotel address"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </FormField>
      </Grid>
    </Grid>
  );
}

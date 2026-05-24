"use client";

import { Controller, useFormContext } from "react-hook-form";
import { MuiTelInput } from "mui-tel-input";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { CURRENCIES } from "../../constants/currencies";
import type { HotelFormValues } from "../../types/hotel";
import { getCountryNameFromPhoneCountry } from "../../utils/phoneCountry";
import { StepLayout } from "../layout/StepLayout";
import { CoverImageField } from "./CoverImage/CoverImageField";

interface BasicInfoStepProps {
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function BasicInfoStep({ isFirst, isLast, onBack, onNext }: BasicInfoStepProps) {
  const { register, control, formState: { errors }, setValue, trigger } = useFormContext<HotelFormValues>();
  const { t } = useTranslation();

  const handleNext = async () => {
    const valid = await trigger("basicInfo");
    if (valid) onNext();
  };

  return (
    <StepLayout
      title={t('agencyHotels.steps.basicInfo.title', 'Hotel information')}
      subtitle={t('agencyHotels.steps.basicInfo.subtitle', 'Basic details about the hotel.')}
      isFirst={isFirst}
      isLast={isLast}
      onBack={onBack}
      onNext={handleNext}
    >
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <CoverImageField />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register("basicInfo.name", { required: t('agencyHotels.form.nameRequired', 'Name is required') })}
            fullWidth
            size="small"
            label={t('agencyHotels.form.name', 'Hotel name')}
            error={!!errors.basicInfo?.name}
            helperText={errors.basicInfo?.name?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="basicInfo.phone"
            control={control}
            rules={{ required: t('agencyHotels.form.phoneRequired', 'Phone is required') }}
            render={({ field, fieldState }) => (
              <MuiTelInput
                {...field}
                fullWidth
                size="small"
                label={t('agencyHotels.form.phone', 'Phone')}
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
                slotProps={{ htmlInput: { dir: 'ltr', style: { direction: 'ltr', textAlign: 'left' } } }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register("basicInfo.city", { required: t('agencyHotels.form.cityRequired', 'City is required') })}
            fullWidth
            size="small"
            label={t('agencyHotels.form.city', 'City')}
            error={!!errors.basicInfo?.city}
            helperText={errors.basicInfo?.city?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="basicInfo.currency"
            control={control}
            rules={{ required: t('agencyHotels.form.currencyRequired', 'Currency is required') }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                fullWidth
                size="small"
                label={t('agencyHotels.form.currency', 'Currency')}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {CURRENCIES.map(({ code, label }) => (
                  <MenuItem key={code} value={code}>
                    {code} — {t(`agencyHotels.currencies.${code}`, label)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register("basicInfo.cancellationFeePercentage", {
              required: t('agencyHotels.form.cancellationFeeRequired', 'Cancellation fee percentage is required'),
              valueAsNumber: true,
              min: { value: 0, message: t('agencyHotels.form.cancellationFeeMin', 'Percentage cannot be less than 0') },
              max: { value: 100, message: t('agencyHotels.form.cancellationFeeMax', 'Percentage cannot exceed 100') },
            })}
            fullWidth
            size="small"
            type="number"
            label={t('agencyHotels.form.cancellationFee', 'Cancellation fee (%)')}
            inputProps={{ min: 0, max: 100, step: 1 }}
            error={!!errors.basicInfo?.cancellationFeePercentage}
            helperText={errors.basicInfo?.cancellationFeePercentage?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            {...register("basicInfo.address", { required: t('agencyHotels.form.addressRequired', 'Address is required') })}
            fullWidth
            size="small"
            label={t('agencyHotels.form.address', 'Address')}
            error={!!errors.basicInfo?.address}
            helperText={errors.basicInfo?.address?.message}
          />
        </Grid>
      </Grid>
    </StepLayout>
  );
}

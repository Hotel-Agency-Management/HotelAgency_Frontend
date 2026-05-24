"use client";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller, useWatch, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HOTEL_TERMS_FORM_ID } from "../constants/form";
import { HOTEL_TERMS_STATUS_OPTIONS, HOTEL_TERMS_STATUSES } from "../constants/status";
import type { HotelTermsFormValues } from "../schema/hotelTermsSchema";

interface HotelTermsFormProps {
  form: UseFormReturn<HotelTermsFormValues>;
  isExistingTerms: boolean;
  isReadOnly: boolean;
  isBusy: boolean;
  isSaving: boolean;
  onSave: () => void;
}

export function HotelTermsForm({
  form,
  isExistingTerms,
  isReadOnly,
  isBusy,
  isSaving,
  onSave,
}: HotelTermsFormProps) {
  const {
    control,
    formState: { errors, isValid },
  } = form;
  const { t } = useTranslation();
  const currentStatus = useWatch({ control, name: "status" });

  return (
    <form
      id={HOTEL_TERMS_FORM_ID}
      noValidate
      onSubmit={event => {
        event.preventDefault();
        void onSave();
      }}
    >
      <Stack spacing={2.5}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('terms.form.title', 'Title')}
              fullWidth
              disabled={isReadOnly}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label={t('terms.form.status', 'Status')}
              fullWidth
              disabled={isReadOnly}
              error={Boolean(errors.status)}
              helperText={
                errors.status?.message ??
                (currentStatus === HOTEL_TERMS_STATUSES.ACTIVE
                  ? t('terms.form.statusActiveHint', 'Terms are active and visible to guests.')
                  : t('terms.form.statusDraftHint', 'Draft can be reviewed before activation.'))
              }
            >
              {HOTEL_TERMS_STATUS_OPTIONS.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label === HOTEL_TERMS_STATUSES.ACTIVE
                    ? t('terms.statusActive', 'Active')
                    : t('terms.statusDraft', 'Draft')}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('terms.form.content', 'Terms content')}
              fullWidth
              multiline
              minRows={12}
              disabled={isReadOnly}
              error={Boolean(errors.content)}
              helperText={
                errors.content?.message ??
                t('terms.form.contentHint', 'Write the hotel-specific booking, cancellation, liability, and stay terms.')
              }
            />
          )}
        />

        {!isExistingTerms ? (
          <Stack direction="row" justifyContent="flex-end">
            <Button
              type="submit"
              form={HOTEL_TERMS_FORM_ID}
              variant="contained"
              size="small"
              disabled={isBusy || !isValid}
              startIcon={
                isSaving ? <CircularProgress size={16} color="inherit" /> : null
              }
            >
              {t('terms.form.saveTerms', 'Save terms')}
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </form>
  );
}

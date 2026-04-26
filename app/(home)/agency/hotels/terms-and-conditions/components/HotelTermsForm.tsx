"use client";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller, type UseFormReturn } from "react-hook-form";
import { HOTEL_TERMS_FORM_ID } from "../constants/form";
import { HOTEL_TERMS_STATUS_OPTIONS } from "../constants/status";
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
              label="Title"
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
              label="Status"
              fullWidth
              disabled={isReadOnly}
              error={Boolean(errors.status)}
              helperText={
                errors.status?.message ?? "Draft can be reviewed before activation."
              }
            >
              {HOTEL_TERMS_STATUS_OPTIONS.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
              label="Terms content"
              fullWidth
              multiline
              minRows={12}
              disabled={isReadOnly}
              error={Boolean(errors.content)}
              helperText={
                errors.content?.message ??
                "Write the hotel-specific booking, cancellation, liability, and stay terms."
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
              Save terms
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </form>
  );
}

"use client";

import { FormProvider } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useThemeForm } from "../../hooks/useThemeForm";
import { ColorsCard } from "./ColorsCard";
import { LogoCard } from "./LogoCard";
import { ThemeFooter } from "./ThemeFooter";
import type { BrandingSettings } from "@/core/theme/palette/branding";

interface CustomThemeTabProps {
  initialValues?: BrandingSettings;
  onSave?: (values: BrandingSettings) => Promise<void> | void;
}

export function CustomThemeTab({ initialValues, onSave }: CustomThemeTabProps) {
  const {
    form,
    isDefault,
    isSaving,
    handleApply,
    handleDiscard,
    handleRestoreDefaults,
  } = useThemeForm({ initialValues, onSave });

  return (
    <FormProvider {...form}>
      <Stack spacing={2.5}>
        <LogoCard />
        <ColorsCard />
        <ThemeFooter
          isSaving={isSaving}
          isDirty={form.formState.isDirty}
          isDefault={isDefault}
          onDiscard={handleDiscard}
          onRestoreDefaults={handleRestoreDefaults}
          onApply={handleApply}
        />
      </Stack>
    </FormProvider>
  );
}

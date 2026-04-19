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
  isSaving?: boolean;
  displayLogo?: string | null;
  onLogoUpload?: (file: File, previewUrl: string) => Promise<void> | void;
  isLogoUploading?: boolean;
}

export function CustomThemeTab({
  initialValues,
  onSave,
  isSaving: externalIsSaving = false,
  displayLogo,
  onLogoUpload,
  isLogoUploading = false,
}: CustomThemeTabProps) {
  const {
    form,
    isDefault,
    isSaving,
    handleApply,
    handleDiscard,
    handleRestoreDefaults,
  } = useThemeForm({ initialValues, onSave });
  const isApplying = isSaving || externalIsSaving;

  return (
    <FormProvider {...form}>
      <Stack spacing={2.5}>
        <LogoCard
          displayLogo={displayLogo}
          onLogoUpload={onLogoUpload}
          isUploading={isLogoUploading}
        />
        <ColorsCard />
        <ThemeFooter
          isSaving={isApplying}
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

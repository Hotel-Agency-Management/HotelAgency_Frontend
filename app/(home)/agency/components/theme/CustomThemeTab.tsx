"use client";

import { FormProvider } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { useThemeForm } from "../../hooks/useThemeForm";
import { ColorsCard } from "./ColorsCard";
import { LogoCard } from "./LogoCard";
import { ThemeFooter } from "./ThemeFooter";

export function CustomThemeTab() {
  const {
    form,
    isDefault,
    isSaving,
    handleApply,
    handleDiscard,
    handleRestoreDefaults,
  } = useThemeForm();

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

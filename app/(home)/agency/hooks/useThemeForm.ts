"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSettings } from "@/core/hooks/useSettings";
import {
  DEFAULT_BRANDING_COLORS,
  DEFAULT_BRANDING_SETTINGS,
  resolveBrandingColors,
  sanitizeBrandingSettings,
  type BrandingSettings,
} from "@/core/theme/palette/branding";

interface UseThemeFormOptions {
  initialValues?: BrandingSettings;
  onSave?: (values: BrandingSettings) => Promise<void> | void;
}

export function useThemeForm(options?: UseThemeFormOptions) {
  const { settings, saveSettings } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  const initialValues = options?.initialValues ?? settings.branding;

  const form = useForm<BrandingSettings>({
    defaultValues: initialValues,
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  const currentValues = form.watch();
  const previewColors = resolveBrandingColors(currentValues.colors);

  const isDefault =
    previewColors.primary === DEFAULT_BRANDING_COLORS.primary &&
    previewColors.secondary === DEFAULT_BRANDING_COLORS.secondary &&
    previewColors.tertiary === DEFAULT_BRANDING_COLORS.tertiary &&
    !currentValues.logo;

  const handleApply = form.handleSubmit(async (values) => {
    setIsSaving(true);
    try {
      const clean = sanitizeBrandingSettings(values);
      if (options?.onSave) {
        await options.onSave(clean);
      } else {
        saveSettings({ ...settings, branding: clean });
      }
      form.reset(clean);
    } finally {
      setIsSaving(false);
    }
  });

  const handleDiscard = () => {
    form.reset(initialValues);
  };

  const handleRestoreDefaults = () => {
    if (!options?.onSave) {
      saveSettings({ ...settings, branding: DEFAULT_BRANDING_SETTINGS });
      form.reset(DEFAULT_BRANDING_SETTINGS);
      return;
    }

    form.reset(DEFAULT_BRANDING_SETTINGS, { keepDefaultValues: true });
  };

  return {
    form,
    currentValues,
    previewColors,
    isDefault,
    isSaving,
    handleApply,
    handleDiscard,
    handleRestoreDefaults,
  };
}

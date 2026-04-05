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

export function useThemeForm() {
  const { settings, saveSettings } = useSettings();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<BrandingSettings>({
    defaultValues: settings.branding,
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset(settings.branding);
  }, [form, settings.branding]);

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
      saveSettings({ ...settings, branding: clean });
      form.reset(clean);
    } finally {
      setIsSaving(false);
    }
  });

  const handleDiscard = () => {
    form.reset(settings.branding);
  };

  const handleRestoreDefaults = () => {
    saveSettings({ ...settings, branding: DEFAULT_BRANDING_SETTINGS });
    form.reset(DEFAULT_BRANDING_SETTINGS);
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

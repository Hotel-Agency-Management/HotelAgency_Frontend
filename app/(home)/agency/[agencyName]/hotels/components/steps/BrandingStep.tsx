"use client";

import { StepLayout } from "../layout/StepLayout";
import Stack from "@mui/material/Stack";
import { useFormContext } from "react-hook-form";
import type { HotelFormValues } from "../../types/hotel";
import { LogoCard } from "@/app/(home)/agency/components/theme/LogoCard";
import { ColorsCard } from "@/app/(home)/agency/components/theme/ColorsCard";
import { useSettings } from "@/core/hooks/useSettings";
import { resolveBrandingColors } from "@/core/theme/palette/branding";

interface BrandingStepProps {
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function BrandingStep({ isFirst, isLast, onBack, onNext }: BrandingStepProps) {
  const { trigger } = useFormContext<HotelFormValues>();
  const { settings } = useSettings();
  const fallbackColors = resolveBrandingColors(settings.branding.colors);

  const handleNext = async () => {
    const valid = await trigger("branding");
    if (valid) onNext();
  };

  return (
    <StepLayout
      title="Brand identity"
      subtitle="Logo and theme colors for this hotel."
      isFirst={isFirst}
      isLast={isLast}
      onBack={onBack}
      onNext={handleNext}
    >
      <Stack spacing={2.5}>
        <LogoCard />
        <ColorsCard namePrefix="branding" fallbackColors={fallbackColors} />
      </Stack>
    </StepLayout>
  );
}

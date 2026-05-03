import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import type { HotelFormValues } from "../types/hotel";
import {
  resolveBrandingColors,
  type BrandingColors,
} from "@/core/theme/palette/branding";

type HotelFormSeed = Partial<HotelFormValues> & { id?: string };

const buildFallbackValues = (brandingColors?: Partial<BrandingColors>): HotelFormValues => ({
  basicInfo: {
    name: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    currency: "USD",
    cancellationFeePercentage: 40,
    coverImage: null,
  },
  branding: {
    logo: null,
    colors: resolveBrandingColors(brandingColors),
  },
  managerId: "",
});

export function useHotelForm(
  values?: HotelFormSeed,
  brandingColors?: Partial<BrandingColors>
) {
  const defaultValues = useMemo(() => {
    const fallbackValues = buildFallbackValues(brandingColors);

    if (!values) return fallbackValues;

    const formValues: Partial<HotelFormValues> = {
      basicInfo: values.basicInfo,
      branding: values.branding,
      managerId: values.managerId,
    };

    return {
      ...fallbackValues,
      ...formValues,
      branding: {
        ...fallbackValues.branding,
        ...formValues.branding,
        colors: {
          ...fallbackValues.branding.colors,
          ...formValues.branding?.colors,
        },
      },
    } as HotelFormValues;
  }, [brandingColors, values]);

  const form = useForm<HotelFormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const hydratedHotelIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!values?.id || hydratedHotelIdRef.current === values.id) return;

    form.reset(defaultValues);
    hydratedHotelIdRef.current = values.id;
  }, [defaultValues, form, values?.id]);

  return form;
}

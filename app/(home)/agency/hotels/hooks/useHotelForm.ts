import { useForm } from "react-hook-form";
import type { HotelFormValues } from "../types/hotel";
import {
  resolveBrandingColors,
  type BrandingColors,
} from "@/core/theme/palette/branding";

const buildFallbackValues = (brandingColors?: Partial<BrandingColors>): HotelFormValues => ({
  basicInfo: {
    name: "",
    phone: "",
    city: "",
    address: "",
    currency: "USD",
    coverImage: null,
  },
  branding: {
    logo: null,
    colors: resolveBrandingColors(brandingColors),
  },
  managerId: "",
});

export function useHotelForm(
  values?: Partial<HotelFormValues>,
  brandingColors?: Partial<BrandingColors>
) {
  const fallbackValues = buildFallbackValues(brandingColors);

  return useForm<HotelFormValues>({
    defaultValues: values
      ? {
          ...fallbackValues,
          ...values,
          branding: {
            ...fallbackValues.branding,
            ...values.branding,
            colors: {
              ...fallbackValues.branding.colors,
              ...values.branding?.colors,
            },
          },
        }
      : fallbackValues,
    mode: "onBlur",
  });
}

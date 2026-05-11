"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useAdminHotelStore } from "@/app/(home)/agency/hotels/hooks/useAdminHotelStore";
import type { HotelFormValues } from "@/app/(home)/agency/hotels/types/hotel";
import type { BrandingSettings } from "@/core/theme/palette/branding";

export function useAdminHotelSettingsPage() {
  const { agencyId, hotelId } = useParams<{ agencyId: string; hotelId: string }>();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") === "theme" ? "theme" : "profile";

  const numericHotelId = Number(hotelId);
  const { hotel, updateHotel, isLoading } = useAdminHotelStore(
    Number(agencyId),
    Number.isFinite(numericHotelId) ? numericHotelId : undefined
  );

  const handleSave = async (data: HotelFormValues) => {
    await updateHotel(hotelId, data);
  };

  const handleThemeSave = async (branding: BrandingSettings) => {
    if (!hotel) return;
    await updateHotel(hotelId, { ...hotel, branding });
  };

  return {
    agencyId,
    hotelId,
    activeTab,
    hotel,
    isLoading,
    handleSave,
    handleThemeSave,
  };
}

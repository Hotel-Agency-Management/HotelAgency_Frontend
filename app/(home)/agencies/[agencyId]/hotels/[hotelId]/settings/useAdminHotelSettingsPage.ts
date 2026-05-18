"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useAdminGetHotelById } from "@/app/(home)/agency/hotels/hooks/queries/useAdminHotelQueries";
import { useAdminHotelUpdate } from "@/app/(home)/agency/hotels/hooks/useAdminHotelUpdate";
import type { HotelFormValues } from "@/app/(home)/agency/hotels/types/hotel";
import type { BrandingSettings } from "@/core/theme/palette/branding";

export function useAdminHotelSettingsPage() {
  const { agencyId, hotelId } = useParams<{ agencyId: string; hotelId: string }>();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") === "theme" ? "theme" : "profile";

  const numericAgencyId = Number(agencyId);
  const numericHotelId = Number.isFinite(Number(hotelId)) ? Number(hotelId) : undefined;
  const { data: hotel, isLoading: isLoadingDetail } = useAdminGetHotelById(numericAgencyId, numericHotelId);
  const { updateHotel, isLoading: isUpdating } = useAdminHotelUpdate(numericAgencyId, numericHotelId);

  const handleSave = async (data: HotelFormValues) => {
    await updateHotel(data);
  };

  const handleThemeSave = async (branding: BrandingSettings) => {
    if (!hotel) return;
    await updateHotel({ ...hotel, branding });
  };

  return {
    agencyId,
    hotelId,
    activeTab,
    hotel,
    isLoading: isLoadingDetail || isUpdating,
    handleSave,
    handleThemeSave,
  };
}

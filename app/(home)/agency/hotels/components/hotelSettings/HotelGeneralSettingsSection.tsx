"use client";

import Alert from "@mui/material/Alert";
import { CustomThemeTab } from "@/app/(home)/agency/components/theme/CustomThemeTab";
import type { BrandingSettings } from "@/core/theme/palette/branding";
import type { HotelFormValues } from "../../types/hotel";
import { useGetHotelById } from "../../hooks/queries/useHotelQueries";
import { useHotelUpdate } from "../../hooks/useHotelUpdate";
import { HotelProfileTab } from "../hotelProfile/HotelProfileTab";

interface HotelGeneralSettingsSectionProps {
  hotelId: string;
  activeTab: "profile" | "theme";
}

export function HotelGeneralSettingsSection({
  hotelId,
  activeTab,
}: HotelGeneralSettingsSectionProps) {
  const numericHotelId = Number.isFinite(Number(hotelId)) ? Number(hotelId) : undefined;
  const { data: hotel, isLoading: isLoadingDetail } = useGetHotelById(numericHotelId);
  const { updateHotel, isLoading: isUpdating } = useHotelUpdate(numericHotelId);
  const isLoading = isLoadingDetail || isUpdating;

  if (isLoadingDetail && !hotel) {
    return <Alert severity="info">Loading hotel settings...</Alert>;
  }

  if (!hotel) {
    return <Alert severity="error">Hotel not found.</Alert>;
  }

  const handleSave = async (data: HotelFormValues) => {
    await updateHotel(data);
  };

  const handleThemeSave = async (branding: BrandingSettings) => {
    await updateHotel({
      ...hotel,
      branding,
    });
  };

  return activeTab === "profile" ? (
    <HotelProfileTab
      defaultValues={hotel}
      onSave={handleSave}
      isLoading={isLoading}
      isActive={hotel.isActive}
    />
  ) : (
    <CustomThemeTab initialValues={hotel.branding} onSave={handleThemeSave} />
  );
}

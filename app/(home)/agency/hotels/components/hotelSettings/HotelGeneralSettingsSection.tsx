"use client";

import Alert from "@mui/material/Alert";
import { useAuth } from "@/core/context/AuthContext";
import { CustomThemeTab } from "@/app/(home)/agency/components/theme/CustomThemeTab";
import type { BrandingSettings } from "@/core/theme/palette/branding";
import type { HotelFormValues } from "../../types/hotel";
import { useHotelStore } from "../../hooks/useHotelStore";
import { HotelProfileTab } from "../hotelProfile/HotelProfileTab";

interface HotelGeneralSettingsSectionProps {
  hotelId: string;
  activeTab: "profile" | "theme";
}

export function HotelGeneralSettingsSection({
  hotelId,
  activeTab,
}: HotelGeneralSettingsSectionProps) {
  const { user } = useAuth();
  const numericHotelId = Number(hotelId);
  const { hotel, updateHotel, isLoading } = useHotelStore(
    user?.agencyId,
    Number.isFinite(numericHotelId) ? numericHotelId : undefined
  );

  if (isLoading && !hotel) {
    return <Alert severity="info">Loading hotel settings...</Alert>;
  }

  if (!hotel) {
    return <Alert severity="error">Hotel not found.</Alert>;
  }

  const handleSave = async (data: HotelFormValues) => {
    await updateHotel(hotelId, data);
  };

  const handleThemeSave = async (branding: BrandingSettings) => {
    await updateHotel(hotelId, {
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

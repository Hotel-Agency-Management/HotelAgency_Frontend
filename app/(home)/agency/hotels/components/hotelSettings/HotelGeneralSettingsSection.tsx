"use client";

import Alert from "@mui/material/Alert";
import { CustomThemeTab } from "@/app/(home)/agency/components/theme/CustomThemeTab";
import { authConfig } from "@/core/configs/clientConfig";
import { useAuth } from "@/core/context/AuthContext";
import type { BrandingSettings } from "@/core/theme/palette/branding";
import type { HotelFormValues } from "../../types/hotel";
import { useGetHotelById } from "../../hooks/queries/useHotelQueries";
import { useHotelFormActions } from "../../hooks/useHotelFormActions";
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
  const { updateHotel, isLoading: isUpdating } = useHotelFormActions();
  const { user, setUser } = useAuth();
  const isLoading = isLoadingDetail || isUpdating;

  if (isLoadingDetail && !hotel) {
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

    if (user?.hotelId === hotelId) {
      const hotelTheme =
        typeof user.hotelTheme === "object" && user.hotelTheme !== null ? user.hotelTheme : {};
      const nextUser = {
        ...user,
        hotelTheme: {
          ...hotelTheme,
          primaryColor: branding.colors.primary,
          secondaryColor: branding.colors.secondary,
          tertiaryColor: branding.colors.tertiary,
          logoUrl: branding.logo,
        },
      };

      setUser(nextUser);
      localStorage.setItem(authConfig.storageUserDataKeyName, JSON.stringify(nextUser));
    }
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

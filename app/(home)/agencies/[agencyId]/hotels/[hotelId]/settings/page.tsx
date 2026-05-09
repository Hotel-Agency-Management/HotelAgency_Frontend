"use client";

import Alert from "@mui/material/Alert";
import { CustomThemeTab } from "@/app/(home)/agency/components/theme/CustomThemeTab";
import { HotelSettingsShell } from "@/app/(home)/agency/hotels/components/hotelSettings/HotelSettingsShell";
import { HotelProfileTab } from "@/app/(home)/agency/hotels/components/hotelProfile/HotelProfileTab";
import { useAdminHotelSettingsPage } from "./useAdminHotelSettingsPage";

export default function AdminHotelSettingsPage() {
  const {
    agencyId,
    hotelId,
    activeTab,
    hotel,
    isLoading,
    handleSave,
    handleThemeSave,
  } = useAdminHotelSettingsPage();

  const content = (() => {
    if (isLoading && !hotel) return <Alert severity="info">Loading hotel settings...</Alert>;
    if (!hotel) return <Alert severity="error">Hotel not found.</Alert>;

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
  })();

  return (
    <HotelSettingsShell hotelId={hotelId} agencyId={agencyId}>
      {content}
    </HotelSettingsShell>
  );
}

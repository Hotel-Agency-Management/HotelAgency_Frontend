"use client";

import { HotelSettingsShell } from "@/app/(home)/agency/hotels/components/hotelSettings/HotelSettingsShell";
import { useAdminHotelSettingsPage } from "./useAdminHotelSettingsPage";
import { AdminHotelSettingsContent } from "./AdminHotelSettingsContent";

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

  return (
    <HotelSettingsShell hotelId={hotelId} agencyId={agencyId}>
      <AdminHotelSettingsContent
        activeTab={activeTab}
        hotel={hotel}
        isLoading={isLoading}
        onSave={handleSave}
        onThemeSave={handleThemeSave}
      />
    </HotelSettingsShell>
  );
}

"use client";

import { useParams } from "next/navigation";
import Alert from "@mui/material/Alert";
import { useAdminHotelStore } from "@/app/(home)/agency/hotels/hooks/useAdminHotelStore";
import { HotelSettingsShell } from "@/app/(home)/agency/hotels/components/hotelSettings/HotelSettingsShell";
import { HotelTermsSettingsView } from "@/app/(home)/agency/hotels/terms-and-conditions/components/HotelTermsSettingsView";

export default function AdminHotelTermsConditionsPage() {
  const { agencyId, hotelId } = useParams<{ agencyId: string; hotelId: string }>();
  const { hotel, isLoading } = useAdminHotelStore(Number(agencyId), Number(hotelId));

  const content = (() => {
    if (isLoading && !hotel) return <Alert severity="info">Loading hotel details...</Alert>;
    if (!hotel) return <Alert severity="error">Hotel not found.</Alert>;

    return <HotelTermsSettingsView hotelId={hotelId} hotelName={hotel.basicInfo.name} />;
  })();

  return (
    <HotelSettingsShell hotelId={hotelId} agencyId={agencyId}>
      {content}
    </HotelSettingsShell>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useAdminHotelStore } from "@/app/(home)/agency/hotels/hooks/useAdminHotelStore";
import { HotelSettingsShell } from "@/app/(home)/agency/hotels/components/hotelSettings/HotelSettingsShell";
import { AdminHotelTermsContent } from "./AdminHotelTermsContent";

export default function AdminHotelTermsConditionsPage() {
  const { agencyId, hotelId } = useParams<{ agencyId: string; hotelId: string }>();
  const { hotel, isLoading } = useAdminHotelStore(Number(agencyId), Number(hotelId));

  return (
    <HotelSettingsShell hotelId={hotelId} agencyId={agencyId}>
      <AdminHotelTermsContent hotelId={hotelId} hotel={hotel} isLoading={isLoading} />
    </HotelSettingsShell>
  );
}

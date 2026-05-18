"use client";

import { useParams } from "next/navigation";
import { useAdminGetHotelById } from "@/app/(home)/agency/hotels/hooks/queries/useAdminHotelQueries";
import { HotelSettingsShell } from "@/app/(home)/agency/hotels/components/hotelSettings/HotelSettingsShell";
import { AdminHotelTermsContent } from "./AdminHotelTermsContent";

export default function AdminHotelTermsConditionsPage() {
  const { agencyId, hotelId } = useParams<{ agencyId: string; hotelId: string }>();
  const { data: hotel, isLoading } = useAdminGetHotelById(Number(agencyId), Number(hotelId));

  return (
    <HotelSettingsShell hotelId={hotelId} agencyId={agencyId}>
      <AdminHotelTermsContent hotelId={hotelId} hotel={hotel} isLoading={isLoading} />
    </HotelSettingsShell>
  );
}

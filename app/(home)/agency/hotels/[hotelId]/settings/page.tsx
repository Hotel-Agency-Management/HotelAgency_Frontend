"use client";

import { useParams, useSearchParams } from "next/navigation";
import { HotelGeneralSettingsSection } from "../../components/hotelSettings/HotelGeneralSettingsSection";
import { HotelSettingsShell } from "../../components/hotelSettings/HotelSettingsShell";

export default function HotelSettingsPage() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") === "theme" ? "theme" : "profile";

  return (
    <HotelSettingsShell hotelId={hotelId}>
      <HotelGeneralSettingsSection hotelId={hotelId} activeTab={activeTab} />
    </HotelSettingsShell>
  );
}

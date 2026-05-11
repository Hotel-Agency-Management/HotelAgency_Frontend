import Alert from "@mui/material/Alert";
import { HotelTermsSettingsView } from "@/app/(home)/agency/hotels/terms-and-conditions/components/HotelTermsSettingsView";
import type { Hotel } from "@/app/(home)/agency/hotels/types/hotel";

interface AdminHotelTermsContentProps {
  hotelId: string;
  hotel: Hotel | undefined;
  isLoading: boolean;
}

export function AdminHotelTermsContent({
  hotelId,
  hotel,
  isLoading,
}: AdminHotelTermsContentProps) {
  if (isLoading && !hotel) return <Alert severity="info">Loading hotel details...</Alert>;
  if (!hotel) return <Alert severity="error">Hotel not found.</Alert>;

  return <HotelTermsSettingsView hotelId={hotelId} hotelName={hotel.basicInfo.name} />;
}

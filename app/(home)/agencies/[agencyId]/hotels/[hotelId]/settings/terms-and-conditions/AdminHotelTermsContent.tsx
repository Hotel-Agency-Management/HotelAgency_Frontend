import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  if (isLoading && !hotel) return <Alert severity="info">{t('hotelSettings.profile.loadingDetails', 'Loading hotel details...')}</Alert>;
  if (!hotel) return <Alert severity="error">{t('hotelSettings.profile.notFound', 'Hotel not found.')}</Alert>;

  return <HotelTermsSettingsView hotelId={hotelId} hotelName={hotel.basicInfo.name} />;
}

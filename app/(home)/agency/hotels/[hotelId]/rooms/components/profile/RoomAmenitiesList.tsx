import { memo, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { AMENITIES_LIST } from "../../constants/amenitiesList";
import { AMENITY_ICON_BY_KEY } from "../../constants/amenityIcons";
import { RoomAmenitiesSkeleton } from "./profileSkelton/RoomAmenitiesSkeleton";
import { RoomAmenitiesGrid } from "./RoomAmenitiesGrid";

export interface RoomAmenitiesListProps {
  amenities: string[];
  loading?: boolean;
}

export const RoomAmenitiesList = memo(function RoomAmenitiesList({
  amenities,
  loading,
}: RoomAmenitiesListProps) {
  const { t } = useTranslation();

  const items = useMemo(() => {
    const map = new Map(AMENITIES_LIST.map((a) => [a.key, a.label]));
    return amenities.map((key) => ({
      key,
      label: map.get(key) ?? key,
      icon: AMENITY_ICON_BY_KEY[key] ?? "tabler:check",
    }));
  }, [amenities]);

  if (loading) return <RoomAmenitiesSkeleton />;

  return (
    <Paper variant="card">
      <Stack gap={2.5}>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          {t("hotelRooms.profile.amenities")}
        </Typography>
        {items.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            {t("hotelRooms.profile.noAmenities")}
          </Typography>
        ) : (
          <RoomAmenitiesGrid items={items} />
        )}
      </Stack>
    </Paper>
  );
});

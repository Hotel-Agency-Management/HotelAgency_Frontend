import { memo, useMemo } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import type { RoomAmenityResponse } from "../../types/room";
import { RoomAmenitiesSkeleton } from "./profileSkelton/RoomAmenitiesSkeleton";
import { RoomAmenitiesGrid } from "./RoomAmenitiesGrid";

export interface RoomAmenitiesListProps {
  amenities: Array<RoomAmenityResponse | string>;
  loading?: boolean;
}

export const RoomAmenitiesList = memo(function RoomAmenitiesList({
  amenities,
  loading,
}: RoomAmenitiesListProps) {
  const { t } = useTranslation();

  const items = useMemo(() => {
    return amenities.map((amenity) => ({
      key: typeof amenity === "string" ? amenity : String(amenity.id),
      label: typeof amenity === "string" ? amenity : amenity.name,
      icon: "tabler:check",
    }));
  }, [amenities]);

  if (loading) return <RoomAmenitiesSkeleton />;

  return (
    <Paper variant="card">
      <Stack gap={2.5}>
        <Typography variant="subtitle1" fontWeight={700}>
          {t("hotelRooms.profile.amenities")}
        </Typography>
        {items.length === 0 ? (
          <Typography variant="body2">
            {t("hotelRooms.profile.noAmenities")}
          </Typography>
        ) : (
          <RoomAmenitiesGrid items={items} />
        )}
      </Stack>
    </Paper>
  );
});

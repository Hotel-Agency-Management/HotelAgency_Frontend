import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  count: number;
  isLoading: boolean;
  onAdd: () => void;
}

export function RoomAmenitiesPageHeader({ count, isLoading, onAdd }: Props) {
  const { t } = useTranslation()

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="h6" fontWeight={700}>
          {t('roomAmenities.title', { defaultValue: 'Room Amenities' })}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('roomAmenities.subtitle', { defaultValue: 'Manage room amenity titles.' })}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {isLoading
            ? t('roomAmenities.loading', { defaultValue: 'Loading amenities...' })
            : t('roomAmenities.countConfigured', { count, defaultValue: '{{count}} amenities configured' })}
        </Typography>
      </Stack>

      <Button variant="contained" startIcon={<Plus size={16} />} onClick={onAdd}>
        {t('roomAmenities.create', { defaultValue: 'Add Amenity' })}
      </Button>
    </Stack>
  );
}

import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AMENITIES_LIST } from "../../../constants/amenitiesList";
import { RoomFormValues } from "../../../schema/roomSchema";
import { getRoomAmenityIcon } from "@/app/(home)/room-amenities/constants/roomAmenityIcons";
import { useRoomAmenities } from "@/app/(home)/room-amenities/hooks/useRoomAmenityStore";

export const RoomAmenitiesPicker = () => {
  const { control, formState: { errors } } = useFormContext<RoomFormValues>();
  const { data: activeAmenities = [] } = useRoomAmenities();
  const amenities =
    activeAmenities.length > 0
      ? activeAmenities.map(({ id, title, icon }) => ({ key: id, label: title, icon }))
      : AMENITIES_LIST.map((amenity) => ({ ...amenity, icon: amenity.key }));

  return (
    <Box>
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Amenities
      </Typography>

      <Controller
        name="amenities"
        control={control}
        render={({ field }) => {
          const selected: string[] = field.value ?? [];

          const toggle = (key: string) => {
            const updated = selected.includes(key)
              ? selected.filter((k) => k !== key)
              : [...selected, key];
            field.onChange(updated);
          };

          return (
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {amenities.map(({ key, label, icon }) => {
                const isSelected = selected.includes(key);
                const Icon = getRoomAmenityIcon(icon);

                return (
                  <Chip
                    key={key}
                    label={label}
                    icon={<Icon size={16} />}
                    clickable
                    onClick={() => toggle(key)}
                    color={isSelected ? "primary" : "default"}
                    variant={isSelected ? "filled" : "outlined"}
                    size="small"
                  />
                );
              })}
            </Stack>
          );
        }}
      />

      {errors.amenities && (
        <Typography variant="caption" color="error" mt={0.5} display="block">
          {errors.amenities.message}
        </Typography>
      )}

      <Controller
        name="amenities"
        control={control}
        render={({ field }) => (
          <Typography variant="caption" color="text.secondary" mt={1} display="block">
            {(field.value ?? []).length} amenit{(field.value ?? []).length !== 1 ? "ies" : "y"} selected
          </Typography>
        )}
      />
    </Box>
  );
};

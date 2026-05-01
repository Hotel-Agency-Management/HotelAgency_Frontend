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
      ? activeAmenities.map(({ id, title, icon }, index) => {
          const numericId = Number(id);

          return {
            key: Number.isFinite(numericId) ? numericId : index + 1,
            label: title,
            icon,
          };
        })
      : AMENITIES_LIST.map((amenity, index) => ({ key: index + 1, label: amenity.label, icon: amenity.key }));

  return (
    <Box>
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Amenities
      </Typography>

      <Controller
        name="amenityIds"
        control={control}
        render={({ field }) => {
          const selected: number[] = field.value ?? [];

          const toggle = (key: number) => {
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

      {errors.amenityIds && (
        <Typography variant="caption" color="error" mt={0.5} display="block">
          {errors.amenityIds.message}
        </Typography>
      )}

      <Controller
        name="amenityIds"
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

import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { RoomFormValues } from "../../../schema/roomSchema";
import { useRoomAmenitiesForPicker } from "@/app/(home)/room-amenities/hooks/useRoomAmenityStore";

export const RoomAmenitiesPicker = () => {
  const { control, formState: { errors } } = useFormContext<RoomFormValues>();
  const { data: amenities = [] } = useRoomAmenitiesForPicker();

  return (
    <Box>
      <Stack spacing={0.5}>
        <Typography variant="subtitle2" fontWeight={700}>
          Amenities
        </Typography>
        <Divider />
      </Stack>

      <Controller
        name="amenityIds"
        control={control}
        render={({ field }) => {
          const selected: number[] = field.value ?? [];

          const toggle = (id: number) => {
            const updated = selected.includes(id)
              ? selected.filter((k) => k !== id)
              : [...selected, id];
            field.onChange(updated);
          };

          return (
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {amenities.map(({ id, name }) => {
                const isSelected = selected.includes(id);

                return (
                  <Chip
                    key={id}
                    label={name}
                    clickable
                    onClick={() => toggle(id)}
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
        <Typography variant="caption" color="error" display="block">
          {errors.amenityIds.message}
        </Typography>
      )}

      <Controller
        name="amenityIds"
        control={control}
        render={({ field }) => (
          <Typography variant="caption" display="block">
            {(field.value ?? []).length} amenit{(field.value ?? []).length !== 1 ? "ies" : "y"} selected
          </Typography>
        )}
      />
    </Box>
  );
};

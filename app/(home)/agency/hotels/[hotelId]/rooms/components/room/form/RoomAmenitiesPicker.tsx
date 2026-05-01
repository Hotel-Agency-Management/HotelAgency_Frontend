import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { RoomFormValues } from "../../../schema/roomSchema";
import { useRoomAmenities } from "@/app/(home)/room-amenities/hooks/useRoomAmenityStore";

export const RoomAmenitiesPicker = () => {
  const { control, formState: { errors } } = useFormContext<RoomFormValues>();
  const { data: amenities = [] } = useRoomAmenities();

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

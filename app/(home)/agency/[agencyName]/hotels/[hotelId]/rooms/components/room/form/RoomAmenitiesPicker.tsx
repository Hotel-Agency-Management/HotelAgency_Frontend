import {
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { AMENITIES_LIST } from "../../../constants/amenitiesList";
import { RoomFormValues } from "../../../schema/roomSchema";

export const RoomAmenitiesPicker = () => {
  const { control, formState: { errors } } = useFormContext<RoomFormValues>();

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
              {AMENITIES_LIST.map(({ key, label }) => {
                const isSelected = selected.includes(key);
                return (
                  <Chip
                    key={key}
                    label={label}
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

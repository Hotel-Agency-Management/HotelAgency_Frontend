import { Grid, TextField, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ROOM_STATUSES } from "../../../constants/roomStatuses";
import { RoomFormValues } from "../../../schema/roomSchema";
import { BED_TYPES } from "../../../constants/bedTypes";


interface RoomTypeOption {
  id: string;
  name: string;
}

interface Props {
  roomTypes: RoomTypeOption[];
}

export const RoomFormFields = ({ roomTypes }: Props) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RoomFormValues>();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          label="Room Number"
          fullWidth
          size="small"
          {...register("roomNumber")}
          error={!!errors.roomNumber}
          helperText={errors.roomNumber?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          label="Floor Number"
          type="number"
          fullWidth
          size="small"
          {...register("floorNumber", { valueAsNumber: true })}
          error={!!errors.floorNumber}
          helperText={errors.floorNumber?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          label="Capacity"
          type="number"
          fullWidth
          size="small"
          {...register("capacity", { valueAsNumber: true })}
          error={!!errors.capacity}
          helperText={errors.capacity?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Controller
          name="roomTypeId"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Room Type"
              fullWidth
              size="small"
              {...field}
              value={field.value ?? ""}
              error={!!errors.roomTypeId}
              helperText={errors.roomTypeId?.message}
              disabled={!roomTypes.length}
            >
              {roomTypes.length === 0 ? (
                <MenuItem value="" disabled>
                  No room types available
                </MenuItem>
              ) : (
                roomTypes.map((roomType) => (
                  <MenuItem key={roomType.id} value={roomType.id}>
                    {roomType.name}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Status"
              fullWidth
              size="small"
              {...field}
              value={field.value ?? ""}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              {Object.entries(ROOM_STATUSES).map(([key, { label }]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Controller
          name="bedType"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Bed Type"
              fullWidth
              size="small"
              {...field}
              value={field.value ?? ""}
              error={!!errors.bedType}
              helperText={errors.bedType?.message}
            >
              {BED_TYPES.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          label="Description"
          fullWidth
          size="small"
          multiline
          rows={2}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          label="Internal Notes"
          fullWidth
          size="small"
          multiline
          rows={2}
          {...register("notes")}
          error={!!errors.notes}
          helperText={errors.notes?.message}
        />
      </Grid>
    </Grid>
  );
};

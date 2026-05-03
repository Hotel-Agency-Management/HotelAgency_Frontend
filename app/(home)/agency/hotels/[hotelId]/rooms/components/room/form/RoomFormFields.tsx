import { Grid, MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ROOM_STATUSES } from "../../../constants/roomStatuses";
import { RoomFormValues } from "../../../schema/roomSchema";

interface RoomTypeOption {
  id: number | string;
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
              value={field.value || ""}
              onChange={(event) => field.onChange(Number(event.target.value))}
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
                  <MenuItem key={roomType.id} value={Number(roomType.id)}>
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
        <TextField
          label="Daily Price"
          type="number"
          fullWidth
          size="small"
          {...register("dailyPrice", { valueAsNumber: true })}
          error={!!errors.dailyPrice}
          helperText={errors.dailyPrice?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          label="Weekly Price"
          type="number"
          fullWidth
          size="small"
          {...register("weeklyPrice", { valueAsNumber: true })}
          error={!!errors.weeklyPrice}
          helperText={errors.weeklyPrice?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          label="Monthly Price"
          type="number"
          fullWidth
          size="small"
          {...register("monthlyPrice", { valueAsNumber: true })}
          error={!!errors.monthlyPrice}
          helperText={errors.monthlyPrice?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          label="Extend Price"
          type="number"
          fullWidth
          size="small"
          {...register("extendPrice", { valueAsNumber: true })}
          error={!!errors.extendPrice}
          helperText={errors.extendPrice?.message}
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

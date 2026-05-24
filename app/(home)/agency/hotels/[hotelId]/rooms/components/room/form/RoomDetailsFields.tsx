import { Grid, MenuItem, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import {
  getRoomStatusLabel,
  ROOM_STATUSES,
} from "../../../constants/roomStatuses";
import { RoomFormValues } from "../../../schema/roomSchema";
import { RoomTypeOption } from "./RoomFormFields";
import { useTranslation } from "react-i18next";

interface Props {
  roomTypes: RoomTypeOption[];
}

export const RoomDetailsFields = ({ roomTypes }: Props) => {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RoomFormValues>();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t("hotelRooms.form.roomNumber", "Room Number")}
          fullWidth
          size="small"
          {...register("roomNumber")}
          error={!!errors.roomNumber}
          helperText={errors.roomNumber?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <Controller
          name="roomTypeId"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label={t("hotelRooms.form.roomType", "Room Type")}
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
                  {t("hotelRooms.form.noRoomTypes", "No room types available")}
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

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label={t("hotelRooms.form.floorNumber", "Floor Number")}
          type="number"
          fullWidth
          size="small"
          {...register("floorNumber", { valueAsNumber: true })}
          error={!!errors.floorNumber}
          helperText={errors.floorNumber?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label={t("hotelRooms.form.capacity", "Capacity")}
          type="number"
          fullWidth
          size="small"
          {...register("capacity", { valueAsNumber: true })}
          error={!!errors.capacity}
          helperText={errors.capacity?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label={t("hotelRooms.form.status", "Status")}
              fullWidth
              size="small"
              {...field}
              value={field.value ?? ""}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              {Object.entries(ROOM_STATUSES).map(([key, { label }]) => (
                <MenuItem key={key} value={key}>
                  {getRoomStatusLabel(t, key, label)}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
    </Grid>
  );
};

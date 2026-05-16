import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RoomFormValues } from "../../../schema/roomSchema";
import type { RoomTypeOption } from "./RoomFormFields";

interface Props {
  roomTypes: RoomTypeOption[];
}

export const RoomNotesFields = (_: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RoomFormValues>();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Description"
          fullWidth
          size="small"
          multiline
          rows={3}
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
          rows={3}
          {...register("notes")}
          error={!!errors.notes}
          helperText={errors.notes?.message}
        />
      </Grid>
    </Grid>
  );
};

import { Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RoomFormValues } from "../../../schema/roomSchema";
import type { RoomTypeOption } from "./RoomFormFields";
import { useTranslation } from "react-i18next";

interface Props {
  roomTypes: RoomTypeOption[];
}

export const RoomPricingFields = (_: Props) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<RoomFormValues>();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          label={t("hotelRooms.form.dailyPrice", "Daily Price")}
          type="number"
          fullWidth
          size="small"
          {...register("dailyPrice", { valueAsNumber: true })}
          error={!!errors.dailyPrice}
          helperText={errors.dailyPrice?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          label={t("hotelRooms.form.weeklyPrice", "Weekly Price")}
          type="number"
          fullWidth
          size="small"
          {...register("weeklyPrice", { valueAsNumber: true })}
          error={!!errors.weeklyPrice}
          helperText={errors.weeklyPrice?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          label={t("hotelRooms.form.monthlyPrice", "Monthly Price")}
          type="number"
          fullWidth
          size="small"
          {...register("monthlyPrice", { valueAsNumber: true })}
          error={!!errors.monthlyPrice}
          helperText={errors.monthlyPrice?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          label={t("hotelRooms.form.extendPrice", "Extend Price")}
          type="number"
          fullWidth
          size="small"
          {...register("extendPrice", { valueAsNumber: true })}
          error={!!errors.extendPrice}
          helperText={errors.extendPrice?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t("hotelRooms.form.yearlyInsurance", "Yearly Insurance")}
          type="number"
          fullWidth
          size="small"
          {...register("yearlyInsurance", { valueAsNumber: true })}
          error={!!errors.yearlyInsurance}
          helperText={errors.yearlyInsurance?.message}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t(
            "hotelRooms.form.insurancePerReservation",
            "Insurance Per Reservation",
          )}
          type="number"
          fullWidth
          size="small"
          {...register("insurancePerReservation", { valueAsNumber: true })}
          error={!!errors.insurancePerReservation}
          helperText={errors.insurancePerReservation?.message}
        />
      </Grid>
    </Grid>
  );
};

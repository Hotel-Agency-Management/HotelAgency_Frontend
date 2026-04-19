import { useEffect } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { defaultRoomAmenityFormValues } from "../../constants/roomAmenityFormValues";
import { ROOM_AMENITY_ICON_OPTIONS } from "../../constants/roomAmenityIcons";
import {
  roomAmenitySchema,
  type RoomAmenityFormValues,
} from "../../schema/roomAmenitySchema";
import type { RoomAmenity } from "../../types/roomAmenity";

interface Props {
  open: boolean;
  amenity: RoomAmenity | null;
  isSaving: boolean;
  onClose: () => void;
  onSaveDetails: (values: RoomAmenityFormValues, id?: string) => Promise<RoomAmenity>;
}

function toFormValues(amenity: RoomAmenity): RoomAmenityFormValues {
  return {
    title: amenity.title,
    icon: amenity.icon,
  };
}

export function RoomAmenityFormDialog({
  open,
  amenity,
  isSaving,
  onClose,
  onSaveDetails,
}: Props) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomAmenityFormValues>({
    resolver: zodResolver(roomAmenitySchema),
    defaultValues: defaultRoomAmenityFormValues,
  });

  useEffect(() => {
    if (!open) return;

    reset(amenity ? toFormValues(amenity) : defaultRoomAmenityFormValues);
  }, [amenity, open, reset]);

  const handleClose = () => {
    if (isSaving) return;
    onClose();
  };

  const handleSave = handleSubmit(async (values) => {
    await onSaveDetails(values, amenity?.id);
    onClose();
  });

  return (
    <Dialog open={open} onClose={isSaving ? undefined : handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{amenity ? "Edit room amenity" : "Create room amenity"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Amenity title"
            placeholder="Enter amenity title"
            fullWidth
            size="small"
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Icon"
                fullWidth
                size="small"
                {...field}
                error={!!errors.icon}
                helperText={errors.icon?.message}
              >
                {ROOM_AMENITY_ICON_OPTIONS.map(({ value, label, Icon }) => (
                  <MenuItem key={value} value={value}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Icon size={16} />
                      <span>{label}</span>
                    </Stack>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="contained"
          disabled={isSaving}
          onClick={handleSave}
          startIcon={isSaving ? <CircularProgress size={16} /> : null}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

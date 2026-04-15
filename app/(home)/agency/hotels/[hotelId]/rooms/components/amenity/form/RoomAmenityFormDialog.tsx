import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { RoomPhotosUpload } from "../../room/form/RoomPhotosUpload";
import { defaultRoomAmenityFormValues } from "../../../constants/roomAmenityFormValues";
import {
  roomAmenitySchema,
  type RoomAmenityFormValues,
} from "../../../schema/roomAmenitySchema";
import {
  ROOM_AMENITY_CATEGORY_VALUES,
  ROOM_AMENITY_STATUS,
  type RoomAmenity,
  type RoomAmenityPhoto,
} from "../../../types/roomAmenity";

interface Props {
  open: boolean;
  amenity: RoomAmenity | null;
  detailsBusy: boolean;
  photosBusy: boolean;
  onClose: () => void;
  onSaveDetails: (values: RoomAmenityFormValues, id?: string) => Promise<RoomAmenity>;
  onSavePhotos: (id: string, photos: RoomAmenityPhoto[]) => Promise<void>;
}

function toFormValues(amenity: RoomAmenity): RoomAmenityFormValues {
  return {
    key: amenity.key,
    label: amenity.label,
    description: amenity.description,
    category: amenity.category,
    status: amenity.status,
  };
}

export function RoomAmenityFormDialog({
  open,
  amenity,
  detailsBusy,
  photosBusy,
  onClose,
  onSaveDetails,
  onSavePhotos,
}: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [workingAmenityId, setWorkingAmenityId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<RoomAmenityPhoto[]>([]);
  const {
    register,
    control,
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
    setActiveStep(0);
    setWorkingAmenityId(amenity?.id ?? null);
    setPhotos(amenity?.photos ?? []);
  }, [amenity, open, reset]);

  const busy = detailsBusy || photosBusy;

  const handleClose = () => {
    if (busy) return;
    onClose();
  };

  const handleDetailsNext = handleSubmit(async (values) => {
    const savedAmenity = await onSaveDetails(values, workingAmenityId ?? undefined);

    setWorkingAmenityId(savedAmenity.id);
    setPhotos(savedAmenity.photos);
    setActiveStep(1);
  });

  const handleFinish = async () => {
    if (!workingAmenityId) return;

    await onSavePhotos(workingAmenityId, photos);
    onClose();
  };

  return (
    <Dialog open={open} onClose={busy ? undefined : handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{amenity ? "Edit room amenity" : "Create room amenity"}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>Main information</StepLabel>
            </Step>
            <Step>
              <StepLabel>Amenity photos</StepLabel>
            </Step>
          </Stepper>

          {activeStep === 0 ? (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Amenity key"
                  fullWidth
                  size="small"
                  {...register("key")}
                  error={!!errors.key}
                  helperText={errors.key?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Amenity name"
                  fullWidth
                  size="small"
                  {...register("label")}
                  error={!!errors.label}
                  helperText={errors.label?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      label="Category"
                      fullWidth
                      size="small"
                      {...field}
                      error={!!errors.category}
                      helperText={errors.category?.message}
                    >
                      {ROOM_AMENITY_CATEGORY_VALUES.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
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
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      <MenuItem value={ROOM_AMENITY_STATUS.ACTIVE}>Active</MenuItem>
                      <MenuItem value={ROOM_AMENITY_STATUS.INACTIVE}>Inactive</MenuItem>
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
                  rows={3}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>
            </Grid>
          ) : null}

          {activeStep === 1 && workingAmenityId ? (
            <RoomPhotosUpload
              roomId={workingAmenityId}
              existingPhotos={photos}
              onPhotosChange={(nextPhotos) => setPhotos(nextPhotos)}
              title="Amenity photos"
              uploadButtonLabel="Upload photos"
              emptyLabel="Click to upload amenity photos"
            />
          ) : null}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={busy}>
          Cancel
        </Button>
        {activeStep === 0 ? (
          <Button
            type="button"
            variant="contained"
            disabled={detailsBusy}
            onClick={handleDetailsNext}
            startIcon={detailsBusy ? <CircularProgress size={16} /> : null}
          >
            Next
          </Button>
        ) : (
          <>
            <Button type="button" onClick={() => setActiveStep(0)} disabled={photosBusy}>
              Back
            </Button>
            <Button
              type="button"
              variant="contained"
              disabled={photosBusy}
              onClick={handleFinish}
              startIcon={photosBusy ? <CircularProgress size={16} /> : null}
            >
              Finish
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

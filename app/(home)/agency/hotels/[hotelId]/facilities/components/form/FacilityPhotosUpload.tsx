import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FacilityPhoto } from "../../types/facility";
import { useFacilityPhotos } from "../../hooks/useFacilityPhotos";
import { FacilityPhotoHeader } from "../FacilityPhotoHeader";
import { FacilityPhotoGrid } from "../list/grid/FacilityPhotoGrid";

interface Props {
  facilityId: string;
  existingPhotos: FacilityPhoto[];
  onPhotosChange: (photos: FacilityPhoto[]) => void;
}

export function FacilityPhotosUpload({ facilityId, existingPhotos, onPhotosChange }: Props) {
  const {
    inputRef,
    photos,
    uploading,
    openFilePicker,
    handleFileChange,
    handleDelete,
    handleSetPrimary,
  } = useFacilityPhotos(facilityId, existingPhotos, onPhotosChange);

  return (
    <Stack spacing={2}>
      <FacilityPhotoHeader uploading={uploading} onUploadClick={openFilePicker} />

      <input
        key={facilityId}
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <FacilityPhotoGrid
        photos={photos}
        onActivate={openFilePicker}
        onSetPrimary={handleSetPrimary}
        onDelete={handleDelete}
      />

      <Typography variant="caption" color="text.secondary" component="p">
        {photos.length} photo{photos.length !== 1 ? "s" : ""}. Star marks the primary cover.
      </Typography>
    </Stack>
  );
}

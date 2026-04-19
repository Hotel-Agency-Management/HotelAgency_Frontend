import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

interface Props {
  uploading: boolean;
  onUploadClick: () => void;
}

export function FacilityPhotoHeader({ uploading, onUploadClick }: Props) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="subtitle2" fontWeight={600} component="span">
        Facility photos
      </Typography>
      <Button
        size="small"
        variant="outlined"
        startIcon={
          uploading ? <CircularProgress size={14} /> : <AddPhotoAlternateIcon />
        }
        onClick={onUploadClick}
        disabled={uploading}
      >
        Upload photos
      </Button>
    </Stack>
  );
}

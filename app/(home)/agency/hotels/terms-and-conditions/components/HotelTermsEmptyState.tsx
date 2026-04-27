import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

interface HotelTermsEmptyStateProps {
  hotelName: string;
  onCreate?: () => void;
}

export function HotelTermsEmptyState({
  hotelName,
  onCreate,
}: HotelTermsEmptyStateProps) {
  return (
    <Stack>
      <Typography variant="body2" maxWidth={560}>
        {hotelName} does not have a saved Terms & Conditions document yet. Add
        one now so future contracts and booking agreements can reference it.
      </Typography>
      {onCreate ? (
        <Button
          variant="contained"
          startIcon={<NoteAddOutlinedIcon />}
          onClick={onCreate}
          size="small"
        >
          Create Terms
        </Button>
      ) : null}
    </Stack>
  );
}

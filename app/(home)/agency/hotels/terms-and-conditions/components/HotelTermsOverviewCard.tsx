import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { HOTEL_TERMS_PREVIEW_MAX_LENGTH } from "../constants/form";
import { HOTEL_TERMS_STATUSES } from "../constants/status";
import type { HotelTermsAndConditions } from "../types/terms";
import { InfoCard } from "../../components/hotelProfile/InfoCard";
import { Box } from "@mui/material";

interface HotelTermsOverviewCardProps {
  hotelName: string;
  terms: HotelTermsAndConditions | null;
}

const getPreview = (value: string) =>
  value.length <= HOTEL_TERMS_PREVIEW_MAX_LENGTH
    ? value
    : `${value.slice(0, HOTEL_TERMS_PREVIEW_MAX_LENGTH).trimEnd()}...`;

export function HotelTermsOverviewCard({
  hotelName,
  terms,
}: HotelTermsOverviewCardProps) {
  return (
    <InfoCard>
      <Stack spacing={1}>
        <Typography variant="h6">Current version</Typography>
        <Typography variant="body2" color="text.secondary">
          Review the latest saved document for {hotelName}.
        </Typography>
      </Stack>

      <Divider />

      {terms ? (
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Chip
              size="small"
              color={terms.status === HOTEL_TERMS_STATUSES.ACTIVE ? "success" : "default"}
              label={terms.status === HOTEL_TERMS_STATUSES.ACTIVE ? "Active" : "Draft"}
            />
            <Typography variant="caption" color="text.secondary">
              Updated {format(new Date(terms.updatedAt), "MMM d, yyyy 'at' h:mm a")}
            </Typography>
          </Stack>

          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {terms.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "pre-line" }}
            >
              {getPreview(terms.content)}
            </Typography>
          </Box>
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Nothing has been saved for this hotel yet.
        </Typography>
      )}
    </InfoCard>
  );
}

import { memo } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { RoomNotesSectionSkeleton } from "./profileSkelton/RoomNotesSectionSkeleton";

export interface RoomNotesSectionProps {
  description?: string;
  notes?: string;
  loading?: boolean;
}

export const RoomNotesSection = memo(function RoomNotesSection({
  description,
  notes,
  loading,
}: RoomNotesSectionProps) {
  const { t } = useTranslation();

  if (loading) return <RoomNotesSectionSkeleton />;

  return (
    <Paper variant="card">
      <Stack gap={2}>
        <Stack gap={1}>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            {t("hotelRooms.profile.description")}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {description?.trim() ? description : t("hotelRooms.profile.noDescription")}
          </Typography>
        </Stack>
        <Divider sx={(theme) => ({ borderColor: theme.palette.secondary.main, opacity: 0.2 })} />
        <Stack gap={1}>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            {t("hotelRooms.profile.notes")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {notes?.trim() ? notes : t("hotelRooms.profile.noNotes")}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
});

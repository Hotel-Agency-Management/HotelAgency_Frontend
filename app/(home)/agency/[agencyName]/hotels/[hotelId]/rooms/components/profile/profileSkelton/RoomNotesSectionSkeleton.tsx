import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export function RoomNotesSectionSkeleton() {
  return (
    <Paper variant="card">
      <Stack gap={1.5}>
        <Skeleton width={140} height={26} />
        <Skeleton height={72} />
        <Skeleton width={80} height={26} />
        <Skeleton height={56} />
      </Stack>
    </Paper>
  );
}

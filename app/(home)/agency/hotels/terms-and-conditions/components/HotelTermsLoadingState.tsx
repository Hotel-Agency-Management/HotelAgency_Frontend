import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export function HotelTermsLoadingState() {
  return (
    <Stack spacing={2.5}>
      <Skeleton variant="text" width={280} height={42} />
      <Skeleton variant="rounded" height={180} />
      <Skeleton variant="rounded" height={420} />
    </Stack>
  );
}

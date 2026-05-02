import { Stack, Skeleton } from "@mui/material";
import { CardFullWidth, FlexSkeleton, SkeletonActions } from "../../../StyledComponents";

export function RoomInfoCardSkeleton() {
  return (
    <CardFullWidth variant="card">
      <Stack spacing={1.25}>
        {Array.from({ length: 5 }, (_, k) => (
          <Skeleton key={k} height={22} />
        ))}
        <Skeleton height={28} width="55%" />
        <SkeletonActions direction="row" spacing={1}>
          <FlexSkeleton height={36} />
          <FlexSkeleton height={36} />
        </SkeletonActions>
      </Stack>
    </CardFullWidth>
  );
}

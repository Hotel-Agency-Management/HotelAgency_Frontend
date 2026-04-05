import { Paper, Stack, Skeleton } from "@mui/material";

export function RoomInfoCardSkeleton() {
  return (
    <Paper variant="card" sx={{ width: 1 }}>
      <Stack spacing={1.25}>
        {Array.from({ length: 5 }, (_, k) => (
          <Skeleton key={k} height={22} />
        ))}
        <Skeleton height={28} width="55%" />
        <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
          <Skeleton height={36} sx={{ flex: 1 }} />
          <Skeleton height={36} sx={{ flex: 1 }} />
        </Stack>
      </Stack>
    </Paper>
  );
}

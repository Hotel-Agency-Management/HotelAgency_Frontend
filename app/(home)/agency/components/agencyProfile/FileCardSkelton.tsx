import { Card, CardContent, Stack, Skeleton } from "@mui/material";

export function FileCardSkeleton() {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Stack spacing={1} alignItems="center">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width="80%" />
        </Stack>
      </CardContent>
    </Card>
  );
}

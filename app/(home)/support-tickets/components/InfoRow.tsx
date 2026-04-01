import { Box, Stack, Typography } from "@mui/material";

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
}

export function InfoRow({ label, children }: InfoRowProps) {
  return (
    <Stack direction="row" spacing={2} py={1} alignItems="flex-start">
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={500}
        sx={{ minWidth: 100}}
      >
        {label}
      </Typography>
      <Box flex={1}>{children}</Box>
    </Stack>
  );
}

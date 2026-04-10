import { Paper, Stack } from "@mui/material"
import { alpha } from "@mui/material/styles"

export function InfoCard({
  children,
  fullHeight = true,
}: {
  children: React.ReactNode;
  fullHeight?: boolean;
}) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        height: fullHeight ? "100%" : "auto",
        borderRadius: 2.5,
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.4),
      }}
    >
      <Stack spacing={1.5} sx={{ p: 2.25 }}>
        {children}
      </Stack>
    </Paper>
  );
}

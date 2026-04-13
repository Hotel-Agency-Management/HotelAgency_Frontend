import { Paper, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";

export function InfoCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        height: "100%",
        bgcolor: theme => alpha(theme.palette.background.default, 0.35),
      }}
    >
      <Stack spacing={1.75} sx={{ p: 2.25, minHeight: 132 }}>
        {children}
      </Stack>
    </Paper>
  );
}

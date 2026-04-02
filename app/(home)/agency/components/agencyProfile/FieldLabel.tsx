import { alpha, Box, Stack, Typography } from "@mui/material";

export function FieldLabel({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "text.secondary" }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
          color: "primary.main",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Typography variant="overline" sx={{ letterSpacing: "0.12em", lineHeight: 1 }}>
        {text}
      </Typography>
    </Stack>
  );
}

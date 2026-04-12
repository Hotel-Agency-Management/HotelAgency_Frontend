import { Stack, Typography } from "@mui/material";

export function FieldHeader({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ color: "text.secondary" }}
    >
      {icon}
      <Typography variant="overline" sx={{ letterSpacing: 0.6 }}>
        {label}
      </Typography>
    </Stack>
  );
}

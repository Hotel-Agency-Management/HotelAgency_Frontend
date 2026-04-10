import Typography from "@mui/material/Typography"

export function FieldValue({
  value,
}: {
  value?: string | null;
}) {
  return (
    <Typography
      variant="h6"
      fontWeight={600}
    >
      {value || "—"}
    </Typography>
  );
}

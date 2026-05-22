import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface DetailItemProps {
  label: string;
  children: React.ReactNode;
  inline?: boolean;
}

export function DetailItem({ label, children, inline = false }: DetailItemProps) {
  if (inline) {
    return (
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography variant="body2" fontWeight={500} minWidth={90}>
          {label}
        </Typography>
        <Stack flex={1} alignItems="flex-end">
          {children}
        </Stack> 
      </Stack>
    );
  }

  return (
    <Stack gap={0.75}>
      <Typography variant="body2" fontWeight={500}>
        {label}
      </Typography>
      {children}
    </Stack>
  );
}
import { br } from "@/core/utils/themeUtils";
import { Stack, useTheme, alpha } from "@mui/material";

export function StatIconBox({ icon, color }: { icon: React.ReactNode; color: string }) {
  const theme = useTheme()
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 36,
        height: 36,
        borderRadius: br(theme, 1.5),
        bgcolor: alpha(color, 0.1),
        flexShrink: 0,
        '& svg': { fontSize: 18, color },
      }}
    >
      {icon}
    </Stack>
  )
}

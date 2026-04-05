import { br } from "@/core/utils/themeUtils"
import { Stack, Typography, useTheme } from "@mui/material"
import { StatIconBox } from "./StatIconBox"
interface StatCardProps {
  label: string
  count: number
  icon: React.ReactNode
  color: string
}
export function StatCard({ label, count, icon, color }: StatCardProps) {
  const theme = useTheme()
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1.5}
      sx={{
        px: { xs: 2, sm: 2.5 },
        py: { xs: 1.5, sm: 2 },
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: br(theme, 2),
        bgcolor: 'background.paper',
        flex: 1,
        minWidth: 0,
        transition: theme.transitions.create('box-shadow'),
        '&:hover': { boxShadow: theme.shadows[2] },
      }}
    >
      <StatIconBox icon={icon} color={color} />
      <Stack sx={{ minWidth: 0 }}>
        <Typography variant="h6" fontWeight={800} sx={{ color }}>
          {count}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap maxWidth={200}>
          {label}
        </Typography>
      </Stack>
    </Stack>
  )
}

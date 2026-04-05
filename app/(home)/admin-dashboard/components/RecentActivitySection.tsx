"use client";

import { Box, Typography, useTheme } from "@mui/material"
import { SxProps, Theme } from '@mui/material'
import { RECENT_ACTIVITY } from "../data/dashboardMock";
import { ActivityItemRow } from "./ActivityItemRow";
import { ActivityItem } from "../types/dashboardTypes";


interface RecentActivitySectionProps {
  activities?: ActivityItem[];
  sx?: SxProps<Theme>
}
export function RecentActivitySection({ activities = RECENT_ACTIVITY }: RecentActivitySectionProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box sx={{ px: 2.5, py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="subtitle2" fontWeight={600} color="text.primary">
          Recent Activity
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Latest platform events
        </Typography>
      </Box>

      <Box sx={{ px: 2.5, py: 1 }}>
        {activities.map((item) => (
          <ActivityItemRow key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
}

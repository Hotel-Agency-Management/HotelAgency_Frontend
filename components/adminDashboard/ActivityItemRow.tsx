import { ActivityItem } from "@/core/types/dashboardTypes";
import { fromNow } from "@/core/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import { Stack, Avatar, Typography, Box } from "@mui/material";
import { ACTIVITY_CONFIG } from "@/core/constant/activityConfig";


export function ActivityItemRow({ item }: { item: ActivityItem }) {
  const theme = useTheme();
  const config = ACTIVITY_CONFIG[item.type];
  const Icon = config.icon;

  return (
    <Stack
      direction="row"
      spacing={1.5}
      py={1.5}
      alignItems="flex-start"
      sx={{
        "&:not(:last-child)": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Avatar
        variant="soft"
        color={config.color}
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        <Icon size={16} strokeWidth={2} />
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" color="text.primary" lineHeight={1.4}>
          {item.message}
        </Typography>

        {item.actor && (
          <Typography variant="caption" color="text.disabled">
            by {item.actor}
          </Typography>
        )}
      </Box>

      <Typography variant="caption" color="text.disabled" flexShrink={0}>
        {fromNow(item.timestamp)}
      </Typography>
    </Stack>
  );
}

import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Avatar from "@/components/ui/Avatar";
import Icon from "@/components/icon/Icon";
import { getActionTypeConfig } from "@/app/(home)/system-logs/utils/getActionTypeConfig";
import { SystemLogItem } from "@/app/(home)/system-logs/types/systemLog";
import { fromNow } from "@/core/utils/Dateutils";

export function ActivityItemRow({ item }: { item: SystemLogItem }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const config = getActionTypeConfig(item.action);

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
        }}
      >
        <Icon icon={config.icon} fontSize={16} />
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" color="text.primary">
          {item.description}
        </Typography>

        {item.actorName && (
          <Typography variant="caption" color="text.disabled">
            {t('dashboard.common.by', { defaultValue: 'by' })} {item.actorName}
          </Typography>
        )}
      </Box>

      <Typography variant="caption" color="text.disabled" flexShrink={0}>
        {fromNow(item.createdAt)}
      </Typography>
    </Stack>
  );
}

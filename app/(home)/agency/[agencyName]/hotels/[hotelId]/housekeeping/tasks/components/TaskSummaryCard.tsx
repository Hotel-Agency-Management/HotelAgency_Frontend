"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import themeConfig from "@/core/configs/themeConfig";

interface TaskSummaryCardProps {
  title: string;
  value: number;
  subtitle: string;
  color?: string;
  icon?: string;
}

export function TaskSummaryCard({ title, value, subtitle, color, icon }: TaskSummaryCardProps) {
  const theme = useTheme();

  const defaultConfig = {
    "Total Tasks": {
      color: theme.palette.primary.main,
      icon: "lucide:list"
    },
    "Pending Tasks": {
      color: theme.palette.warning.main,
      icon: "lucide:clock"
    },
    "In Progress": {
      color: theme.palette.info.main,
      icon: "lucide:loader"
    },
    "Completed": {
      color: theme.palette.success.main,
      icon: "lucide:check-circle"
    },
    "Critical Issues": {
      color: theme.palette.error.main,
      icon: "lucide:alert-triangle"
    },
    "Delayed Rooms": {
      color: theme.palette.warning.main,
      icon: "lucide:clock"
    },
    "Re-clean Required": {
      color: theme.palette.info.main,
      icon: "lucide:rotate-ccw"
    },
    "Resolved Today": {
      color: theme.palette.success.main,
      icon: "lucide:check-circle"
    }
  }[title] ?? {
    color: theme.palette.primary.main,
    icon: "lucide:list"
  };
  const config = {
    color: color ?? defaultConfig.color,
    icon: icon ?? defaultConfig.icon
  };

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          p: themeConfig.common.commonPadding,
          "&:last-child": {
            pb: themeConfig.common.commonPadding
          }
        }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <Icon
            icon={config.icon}
            width={16}
            height={16}
            style={{ color: config.color }}
          />

          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            {title}
          </Typography>
        </Stack>

        <Typography variant="h4" fontWeight={700} lineHeight={1}>
          {value}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

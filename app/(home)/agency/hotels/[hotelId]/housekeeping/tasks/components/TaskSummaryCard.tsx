"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTaskSummaryConfig } from "../../utils/taskSummaryConfig";

interface TaskSummaryCardProps {
  title: string;
  value: number;
  subtitle: string;
  color?: string;
  icon?: string;
}

export function TaskSummaryCard({ title, value, subtitle, color, icon }: TaskSummaryCardProps) {
  const theme = useTheme()
  const config = getTaskSummaryConfig(title, theme.palette, { color, icon })

  return (
    <Card>
      <CardContent>
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

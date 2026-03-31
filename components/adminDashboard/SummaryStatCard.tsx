"use client";

import { Card, CardContent, Stack, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import RemoveIcon from "@mui/icons-material/Remove";
import { StatCardProps } from "@/core/types/dashboardTypes";
import Avatar from "../ui/Avatar";

const TREND_ICONS = {
  up: TrendingUpIcon,
  down: TrendingDownIcon,
  neutral: RemoveIcon,
};

const TREND_COLORS = {
  up: "success.main",
  down: "error.main",
  neutral: "text.disabled",
};

export function SummaryStatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  color = "primary",
}: StatCardProps) {
  const TrendIcon = trend ? TREND_ICONS[trend.direction] : null;
  const trendColor = trend ? TREND_COLORS[trend.direction] : undefined;

  return (
    <Card
      variant="outlined"
    >
      <CardContent
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: "100%",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="body2" fontWeight={500}>
            {title}
          </Typography>

          {icon && (
            <Avatar
              variant="soft"
              color={color}
              sx={{
                width: 36,
                height: 36,
                flexShrink: 0,
              }}
            >
              {icon}
            </Avatar>
          )}
        </Stack>

        <Typography variant="h5" fontWeight={700} lineHeight={1}>
          {value}
        </Typography>

        {subtitle && (
          <Typography variant="caption" color="text.disabled">
            {subtitle}
          </Typography>
        )}

        {trend && TrendIcon && (
          <Stack direction="row" alignItems="center" spacing={0.5} mt="auto">
            <TrendIcon sx={{ fontSize: 14, color: trendColor }} />
            <Typography variant="caption" sx={{ color: trendColor }} fontWeight={500}>
              {trend.value}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { ArrowDown, ArrowUp } from "lucide-react";

interface HousekeepingSummaryCardProps {
  title: string;
  value: number;
  change: number;
  subtitle: string;
  color: string;
}

export function HousekeepingSummaryCard({
  title,
  value,
  change,
  subtitle,
  color
}: HousekeepingSummaryCardProps) {
  const theme = useTheme();
  const isPositive = change >= 0;
  const trendColor = isPositive ? theme.palette.success.main : theme.palette.error.main;
  const TrendIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderColor: alpha(color, 0.22)
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,

        }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <Stack
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: color,
              flexShrink: 0
            }}
          />
          <Typography variant="body2" fontWeight={600}>
            {title}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" gap={1.5} flexWrap="wrap">
          <Typography variant="h4" fontWeight={700}>
            {value}
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.75}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: trendColor,
                color: theme.palette.common.white
              }}
            >
              <TrendIcon size={14} />
            </Stack>
            <Typography variant="body2" fontWeight={700} sx={{ color: trendColor }}>
              {Math.abs(change)}%
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="body2">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getTicketSummaryConfig } from "../../utils/ticketSummaryConfig";

interface TicketSummaryCardProps {
  title: string;
  value: number;
  subtitle: string;
  color?: string;
  icon?: string;
}

export function TicketSummaryCard({ title, value, subtitle, color, icon }: TicketSummaryCardProps) {
  const theme = useTheme()
  const config = getTicketSummaryConfig(title, theme.palette, { color, icon })

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

          <Typography variant="body2" fontWeight={600}>
            {title}
          </Typography>
        </Stack>

        <Typography variant="h4" fontWeight={700} lineHeight={1}>
          {value}
        </Typography>

        <Typography variant="body2">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

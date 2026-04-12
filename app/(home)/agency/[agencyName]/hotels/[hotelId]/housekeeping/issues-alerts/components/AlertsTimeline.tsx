"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { SEVERITY_META } from "../constants/issueAlerts";
import type { AlertTimelineItem } from "../types/issue";
import { TimelineMarker } from "./TimelineMarker";

export function AlertsTimeline({ items }: { items: AlertTimelineItem[] }) {
  const theme = useTheme();

  return (
    <Paper variant="card">
      <Stack gap={2.5}>
        <Stack gap={0.5}>
          <Typography variant="subtitle1" fontWeight={700}>
            Alerts Timeline
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Live-style activity from inspection and room status checks.
          </Typography>
        </Stack>

        <Stack>
          {items.map((item, index) => {
            const meta = SEVERITY_META[item.severity];
            const color = theme.palette[meta.palette].main;
            const isLast = index === items.length - 1;

            return (
              <Stack
                key={item.id}
                direction="row"
                gap={2}
                sx={{
                  minHeight: 56,
                  alignItems: "stretch"
                }}
              >
                <Stack
                  alignItems="center"
                  sx={{
                    width: 24,
                    flexShrink: 0
                  }}
                >
                  <TimelineMarker color={color} isLast={isLast} />
                </Stack>
                <Stack direction="row" gap={2} >
                  <Typography variant="body2" fontWeight={800} >
                    {item.time}
                  </Typography>
                  <Typography variant="body2" >
                    {item.label}
                  </Typography>
                </Stack>
              </Stack>
            )
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}

"use client";
import { PulseDot } from "@/components/animation/PulseDot";
import Box from "@mui/material/Box";
import { alpha, useTheme } from "@mui/material/styles";

interface TimelineMarkerProps {
  color: string;
  isLast?: boolean;
}

export function TimelineMarker({ color, isLast = false }: TimelineMarkerProps) {
  const theme = useTheme();
  return (
    <>
      <PulseDot color={color} size="sm" />

      {!isLast && (
        <Box
          sx={{
            width: "1px",
            flex: 1,
            mt: 0.5,
            bgcolor: alpha(theme.palette.text.secondary, 0.15),
          }}
        />
      )}
    </>
  );
}

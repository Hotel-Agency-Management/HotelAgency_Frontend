"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { MapPin } from "lucide-react";

interface HotelCardBaseProps {
  name: string;
  city: string;
  coverImage?: string | null;
  primaryColor: string;
}

export function HotelCardBase({ name, city, coverImage, primaryColor }: HotelCardBaseProps) {
  return (
    <>
      {coverImage ? (
        <Box
          component="img"
          src={coverImage}
          alt={name}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <Box sx={{ width: "100%", height: "100%", bgcolor: alpha(primaryColor, 0.2) }} />
      )}

      <Box className="base-gradient" />

      <Box className="base-info">
        <Stack spacing={0.5}>
          <Typography variant="subtitle1" fontWeight={600} color="common.white" noWrap>
            {name}
          </Typography>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <MapPin size={14} color="white"/>
            <Typography variant="caption" noWrap color="white">
              {city}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ImagePlus } from "lucide-react";

export function CoverImagePlaceholder() {
  return (
    <Stack spacing={1} alignItems="center" justifyContent="center" height="100%">
      <ImagePlus size={22} color="var(--mui-palette-text-disabled)" />
      <Typography variant="caption" color="text.disabled">
        Click to upload cover image
      </Typography>
      <Typography variant="caption" color="text.disabled" sx={{ fontSize: "0.6rem" }}>
        PNG, JPG, WEBP · max 5 MB
      </Typography>
    </Stack>
  );
}

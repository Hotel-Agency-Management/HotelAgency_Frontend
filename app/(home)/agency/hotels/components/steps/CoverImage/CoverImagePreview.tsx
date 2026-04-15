"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import { ImagePlus, Trash2 } from "lucide-react";

interface CoverImagePreviewProps {
  src: string;
  onChange: () => void;
  onRemove: () => void;
}

export function CoverImagePreview({ src, onChange, onRemove }: CoverImagePreviewProps) {
  return (
    <>
      <Box
        component="img"
        src={src}
        alt="Cover preview"
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Stack direction="row" spacing={1} sx={{ position: "absolute", bottom: 8, right: 8 }}>
        <Button
          size="small"
          variant="contained"
          disableElevation
          startIcon={<ImagePlus size={13} />}
          onClick={onChange}
          sx={(theme) => ({
            bgcolor: alpha(theme.palette.common.black, 0.55),
            "&:hover": { bgcolor: alpha(theme.palette.common.black, 0.75) },
          })}
        >
          Change
        </Button>
        <Button
          size="small"
          variant="contained"
          disableElevation
          startIcon={<Trash2 size={13} />}
          onClick={onRemove}
          sx={(theme) => ({
            bgcolor: alpha(theme.palette.common.black, 0.55),
            "&:hover": { bgcolor: theme.palette.error.main },
          })}
        >
          Remove
        </Button>
      </Stack>
    </>
  );
}

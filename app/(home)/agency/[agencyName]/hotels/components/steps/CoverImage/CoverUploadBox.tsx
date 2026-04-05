"use client";

import Box from "@mui/material/Box";

interface Props {
  hasImage: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function CoverUploadBox({ hasImage, onClick, children }: Props) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%",
        height: 160,
        borderRadius: 3,
        border: "0.5px dashed",
        borderColor: hasImage ? "transparent" : "divider",
        bgcolor: "background.default",
        overflow: "hidden",
        position: "relative",
        cursor: hasImage ? "default" : "pointer",
      }}
    >
      {children}
    </Box>
  );
}

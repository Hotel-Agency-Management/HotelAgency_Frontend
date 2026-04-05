import type { SxProps, Theme } from "@mui/material/styles";

export const roomGridContainerSx: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: 2,
};

export const roomCardRootSx: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

export const roomCardImageAreaSx: SxProps<Theme> = {
  position: "relative",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  flexShrink: 0,
};

export const roomCardImageMediaSx: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const roomCardPlaceholderSx: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "action.hover",
};

export const roomGridLoadingSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 240,
};

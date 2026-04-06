import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const RoomCardImageArea = styled(Box)({
  position: "relative",
  aspectRatio: "16 / 9",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: "12px 12px 0 0",
});

export const RoomCardImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const RoomCardPlaceholder = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.action.hover,
}));

export const RoomGridLoading = styled(Stack)({
  alignItems: "center",
  justifyContent: "center",
  minHeight: 240,
});
